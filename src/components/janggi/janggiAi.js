/**
 * AI Engine for Double-Strike Janggi
 * Implements Heuristic evaluation, Fusion synergy bonus, and Destination Deduplication
 */

import {
  TEAMS,
  PIECE_TYPES,
  getUnitActions,
  getComboStep2Moves,
  getEjectMoves,
  cloneBoard,
  createUnit,
} from './janggiEngine';

// Heuristic synergy bonuses (from Web Gemini audit spec)
const SYNERGY_BONUS = {
  [`${PIECE_TYPES.CHA}_${PIECE_TYPES.MA}`]: 450,
  [`${PIECE_TYPES.MA}_${PIECE_TYPES.CHA}`]: 450,
  [`${PIECE_TYPES.CHA}_${PIECE_TYPES.SANG}`]: 350,
  [`${PIECE_TYPES.SANG}_${PIECE_TYPES.CHA}`]: 350,
  [`${PIECE_TYPES.PO}_${PIECE_TYPES.MA}`]: 320,
  [`${PIECE_TYPES.MA}_${PIECE_TYPES.PO}`]: 320,
  [`${PIECE_TYPES.KING}_${PIECE_TYPES.SA}`]: 180,
  [`${PIECE_TYPES.SA}_${PIECE_TYPES.KING}`]: 180,
  [`${PIECE_TYPES.MA}_${PIECE_TYPES.MA}`]: -100,
  [`${PIECE_TYPES.JOL}_${PIECE_TYPES.JOL}`]: -100,
};

function getPieceScore(type) {
  switch (type) {
    case PIECE_TYPES.KING: return 10000;
    case PIECE_TYPES.CHA: return 130;
    case PIECE_TYPES.PO: return 70;
    case PIECE_TYPES.MA: return 50;
    case PIECE_TYPES.SANG: return 30;
    case PIECE_TYPES.SA: return 30;
    case PIECE_TYPES.JOL: return 20;
    default: return 0;
  }
}

/**
 * Static evaluation of board from Han's perspective
 * Higher is better for Han, lower is better for Cho
 */
export function evaluateBoard(board) {
  let score = 0;

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const unit = board[r][c];
      if (!unit) continue;

      let unitValue = 0;
      unit.pieces.forEach(p => {
        unitValue += getPieceScore(p.type);
      });

      // Synergy bonus if stacked
      if (unit.pieces.length === 2) {
        const key = `${unit.pieces[0].type}_${unit.pieces[1].type}`;
        const bonus = SYNERGY_BONUS[key] || 150;
        unitValue += bonus;
      }

      // Small positional bonus: Han moves towards r=9, Cho towards r=0
      if (unit.team === TEAMS.HAN) {
        score += unitValue + r * 2;
      } else {
        score -= (unitValue + (9 - r) * 2);
      }
    }
  }

  return score;
}

/**
 * Generate all candidates for a team
 */
export function getAllPossibleMovesForTeam(board, team) {
  const allMoves = [];

  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const unit = board[r][c];
      if (!unit || unit.team !== team) continue;

      const actions = getUnitActions(board, r, c);

      if (!actions.isStacked) {
        // Single piece moves
        actions.singleMoves.forEach(m => {
          allMoves.push({
            type: m.isFusion ? 'FUSION' : 'SINGLE_MOVE',
            from: { r, c },
            to: { r: m.r, c: m.c },
            isCapture: m.isCapture,
            targetUnit: m.targetUnit,
          });
        });
      } else {
        // Stacked unit combo moves
        const tryCombo = (step1List) => {
          step1List.forEach(s1 => {
            // Virtual step 1 board
            const simBoard = cloneBoard(board);
            const movingUnit = simBoard[r][c];
            simBoard[r][c] = null;
            simBoard[s1.r][s1.c] = movingUnit;

            const step2List = getComboStep2Moves(simBoard, { r: s1.r, c: s1.c }, s1.remainingPiece, movingUnit);

            // Option 1: Stop after step 1
            allMoves.push({
              type: 'COMBO_STOP_1',
              from: { r, c },
              step1: { r: s1.r, c: s1.c, usedPiece: s1.usedPiece },
              isCapture: false,
            });

            // Option 2: Full step 1 + step 2
            step2List.forEach(s2 => {
              allMoves.push({
                type: 'COMBO_FULL',
                from: { r, c },
                step1: { r: s1.r, c: s1.c, usedPiece: s1.usedPiece },
                step2: { r: s2.r, c: s2.c, isCapture: s2.isCapture },
                isCapture: s2.isCapture,
                targetUnit: s2.targetUnit,
              });
            });
          });
        };

        tryCombo(actions.comboStep1Moves.viaA);
        tryCombo(actions.comboStep1Moves.viaB);

        // Eject moves (0 and 1)
        [0, 1].forEach(idx => {
          const ejects = getEjectMoves(board, r, c, idx);
          ejects.forEach(em => {
            allMoves.push({
              type: 'EJECT',
              from: { r, c },
              to: { r: em.r, c: em.c },
              ejectPieceIndex: idx,
              isCapture: em.isCapture,
              targetUnit: em.targetUnit,
            });
          });
        });
      }
    }
  }

  return allMoves;
}

/**
 * Find best move for AI
 */
export function getBestAiMove(board, aiTeam = TEAMS.HAN) {
  const moves = getAllPossibleMovesForTeam(board, aiTeam);
  if (moves.length === 0) return null;

  let bestMove = null;
  let bestScore = aiTeam === TEAMS.HAN ? -Infinity : Infinity;

  // Prioritize and evaluate each move
  moves.forEach(m => {
    const simBoard = cloneBoard(board);
    let moveWeight = 0;

    // Fast check: King capture is instant win
    if (m.isCapture && m.targetUnit) {
      const hasEnemyKing = m.targetUnit.pieces.some(p => p.type === PIECE_TYPES.KING);
      if (hasEnemyKing) {
        moveWeight += 50000;
      } else {
        m.targetUnit.pieces.forEach(p => {
          moveWeight += getPieceScore(p.type) * 2;
        });
      }
    }

    if (m.type === 'FUSION') {
      moveWeight += 200; // Prefer fusion when safe
    }

    // Apply move on simulated board
    if (m.type === 'SINGLE_MOVE' || m.type === 'FUSION') {
      const movingUnit = simBoard[m.from.r][m.from.c];
      simBoard[m.from.r][m.from.c] = null;
      if (m.type === 'FUSION') {
        const destUnit = simBoard[m.to.r][m.to.c];
        simBoard[m.to.r][m.to.c] = createUnit(destUnit.team, [...destUnit.pieces, ...movingUnit.pieces]);
      } else {
        simBoard[m.to.r][m.to.c] = movingUnit;
      }
    } else if (m.type === 'COMBO_FULL') {
      const movingUnit = simBoard[m.from.r][m.from.c];
      simBoard[m.from.r][m.from.c] = null;
      simBoard[m.step2.r][m.step2.c] = movingUnit;
    } else if (m.type === 'COMBO_STOP_1') {
      const movingUnit = simBoard[m.from.r][m.from.c];
      simBoard[m.from.r][m.from.c] = null;
      simBoard[m.step1.r][m.step1.c] = movingUnit;
    } else if (m.type === 'EJECT') {
      const unit = simBoard[m.from.r][m.from.c];
      const ejectPiece = unit.pieces[m.ejectPieceIndex];
      const stayPiece = unit.pieces[1 - m.ejectPieceIndex];
      simBoard[m.from.r][m.from.c] = createUnit(unit.team, stayPiece);
      simBoard[m.to.r][m.to.c] = createUnit(unit.team, ejectPiece);
    }

    const evalScore = evaluateBoard(simBoard) + (aiTeam === TEAMS.HAN ? moveWeight : -moveWeight);

    // Add tiny random jitter to avoid repetitive play
    const finalScore = evalScore + (Math.random() * 4 - 2);

    if (aiTeam === TEAMS.HAN) {
      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestMove = m;
      }
    } else {
      if (finalScore < bestScore) {
        bestScore = finalScore;
        bestMove = m;
      }
    }
  });

  return bestMove;
}
