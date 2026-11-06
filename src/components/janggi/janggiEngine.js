/**
 * Double-Strike Janggi (연격 장기) Core Engine
 * Adheres to traditional Janggi rules + Stacking (Fusion) & Double Action (연격)
 */

export const TEAMS = {
  CHO: 'cho', // Blue / Cyan (Player default)
  HAN: 'han', // Red / Magenta (Opponent / AI)
};

export const PIECE_TYPES = {
  KING: 'king',   // 楚 / 漢 (100)
  CHA: 'cha',     // 車 (13)
  PO: 'po',       // 包 (7)
  MA: 'ma',       // 馬 (5)
  SANG: 'sang',   // 象 (3)
  SA: 'sa',       // 士 (3)
  JOL: 'jol',     // 卒 / 兵 (2)
};

export const PIECE_WEIGHTS = {
  [PIECE_TYPES.KING]: 100,
  [PIECE_TYPES.CHA]: 13,
  [PIECE_TYPES.PO]: 7,
  [PIECE_TYPES.MA]: 5,
  [PIECE_TYPES.SANG]: 3,
  [PIECE_TYPES.SA]: 3,
  [PIECE_TYPES.JOL]: 2,
};

export const PIECE_KANJI = {
  [TEAMS.CHO]: {
    [PIECE_TYPES.KING]: '楚',
    [PIECE_TYPES.CHA]: '車',
    [PIECE_TYPES.PO]: '包',
    [PIECE_TYPES.MA]: '馬',
    [PIECE_TYPES.SANG]: '象',
    [PIECE_TYPES.SA]: '士',
    [PIECE_TYPES.JOL]: '卒',
  },
  [TEAMS.HAN]: {
    [PIECE_TYPES.KING]: '漢',
    [PIECE_TYPES.CHA]: '車',
    [PIECE_TYPES.PO]: '包',
    [PIECE_TYPES.MA]: '馬',
    [PIECE_TYPES.SANG]: '象',
    [PIECE_TYPES.SA]: '士',
    [PIECE_TYPES.JOL]: '兵',
  },
};

export const PIECE_NAMES = {
  [PIECE_TYPES.KING]: '궁(王)',
  [PIECE_TYPES.CHA]: '차(車)',
  [PIECE_TYPES.PO]: '포(包)',
  [PIECE_TYPES.MA]: '마(馬)',
  [PIECE_TYPES.SANG]: '상(象)',
  [PIECE_TYPES.SA]: '사(士)',
  [PIECE_TYPES.JOL]: '졸/병(卒)',
};

/**
 * Check if coordinate is inside 9x10 board
 */
export function isInBoard(r, c) {
  return r >= 0 && r < 10 && c >= 0 && c < 9;
}

/**
 * Check if coordinate is inside palace
 */
export function isInPalace(r, c, team) {
  if (c < 3 || c > 5) return false;
  if (team === TEAMS.HAN) return r >= 0 && r <= 2;
  if (team === TEAMS.CHO) return r >= 7 && r <= 9;
  return (r >= 0 && r <= 2) || (r >= 7 && r <= 9);
}

/**
 * Palace diagonal definitions
 */
export function getPalaceDiagonals(r, c) {
  // Han palace
  if (r === 0 && c === 3) return [{ r: 1, c: 4 }];
  if (r === 0 && c === 5) return [{ r: 1, c: 4 }];
  if (r === 2 && c === 3) return [{ r: 1, c: 4 }];
  if (r === 2 && c === 5) return [{ r: 1, c: 4 }];
  if (r === 1 && c === 4) return [
    { r: 0, c: 3 }, { r: 0, c: 5 },
    { r: 2, c: 3 }, { r: 2, c: 5 }
  ];

  // Cho palace
  if (r === 7 && c === 3) return [{ r: 8, c: 4 }];
  if (r === 7 && c === 5) return [{ r: 8, c: 4 }];
  if (r === 9 && c === 3) return [{ r: 8, c: 4 }];
  if (r === 9 && c === 5) return [{ r: 8, c: 4 }];
  if (r === 8 && c === 4) return [
    { r: 7, c: 3 }, { r: 7, c: 5 },
    { r: 9, c: 3 }, { r: 9, c: 5 }
  ];

  return [];
}

/**
 * Create a new atomic piece
 */
let pieceIdCounter = 1;
export function createPiece(team, type) {
  return {
    id: `${team}-${type}-${pieceIdCounter++}`,
    team,
    type,
    weight: PIECE_WEIGHTS[type],
  };
}

/**
 * Create a board unit containing 1 or 2 pieces
 */
export function createUnit(team, pieces) {
  const pList = Array.isArray(pieces) ? pieces : [pieces];
  return {
    unitId: `unit-${pList.map(p => p.id).join('_')}`,
    team,
    pieces: pList,
  };
}

/**
 * Initialize a 9x10 board with traditional Janggi setup
 */
export function createInitialBoard() {
  pieceIdCounter = 1;
  const board = Array(10).fill(null).map(() => Array(9).fill(null));

  // --- Han (Red) setup (Rows 0-3) ---
  // Row 0
  board[0][0] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.CHA));
  board[0][1] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.MA));
  board[0][2] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.SANG));
  board[0][3] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.SA));
  board[0][5] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.SA));
  board[0][6] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.SANG));
  board[0][7] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.MA));
  board[0][8] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.CHA));
  // King
  board[1][4] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.KING));
  // Cannons (Row 2)
  board[2][1] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.PO));
  board[2][7] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.PO));
  // Soldiers (Row 3, 兵)
  [0, 2, 4, 6, 8].forEach(c => {
    board[3][c] = createUnit(TEAMS.HAN, createPiece(TEAMS.HAN, PIECE_TYPES.JOL));
  });

  // --- Cho (Blue) setup (Rows 6-9) ---
  // Soldiers (Row 6, 卒)
  [0, 2, 4, 6, 8].forEach(c => {
    board[6][c] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.JOL));
  });
  // Cannons (Row 7)
  board[7][1] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.PO));
  board[7][7] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.PO));
  // King
  board[8][4] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.KING));
  // Row 9
  board[9][0] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.CHA));
  board[9][1] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.MA));
  board[9][2] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.SANG));
  board[9][3] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.SA));
  board[9][5] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.SA));
  board[9][6] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.SANG));
  board[9][7] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.MA));
  board[9][8] = createUnit(TEAMS.CHO, createPiece(TEAMS.CHO, PIECE_TYPES.CHA));

  return board;
}

/**
 * Deep clone a board
 */
export function cloneBoard(board) {
  return board.map(row => row.map(cell => {
    if (!cell) return null;
    return {
      unitId: cell.unitId,
      team: cell.team,
      pieces: cell.pieces.map(p => ({ ...p })),
    };
  }));
}

/**
 * Raw traditional move generator for an individual piece type
 * Returns array of { r, c }
 */
export function getRawPieceMoves(board, r, c, pieceType, team) {
  const moves = [];

  switch (pieceType) {
    case PIECE_TYPES.KING:
    case PIECE_TYPES.SA: {
      // Orthogonal 1 step inside palace
      const orthos = [
        { r: r - 1, c }, { r: r + 1, c },
        { r, c: c - 1 }, { r, c: c + 1 }
      ];
      orthos.forEach(pos => {
        if (isInBoard(pos.r, pos.c) && isInPalace(pos.r, pos.c, team)) {
          moves.push(pos);
        }
      });
      // Diagonals along palace lines
      const diags = getPalaceDiagonals(r, c);
      diags.forEach(pos => {
        if (isInPalace(pos.r, pos.c, team)) {
          moves.push(pos);
        }
      });
      break;
    }

    case PIECE_TYPES.JOL: {
      // Forward direction: Cho moves -r (upwards), Han moves +r (downwards)
      const forwardR = team === TEAMS.CHO ? -1 : 1;
      const candidates = [
        { r: r + forwardR, c }, // forward
        { r, c: c - 1 },        // left
        { r, c: c + 1 },        // right
      ];
      candidates.forEach(pos => {
        if (isInBoard(pos.r, pos.c)) {
          moves.push(pos);
        }
      });

      // Inside enemy palace, can move along forward diagonals
      const enemyTeam = team === TEAMS.CHO ? TEAMS.HAN : TEAMS.CHO;
      if (isInPalace(r, c, enemyTeam)) {
        const diags = getPalaceDiagonals(r, c);
        diags.forEach(pos => {
          // must strictly move forward along the diagonal
          if ((team === TEAMS.CHO && pos.r < r) || (team === TEAMS.HAN && pos.r > r)) {
            moves.push(pos);
          }
        });
      }
      break;
    }

    case PIECE_TYPES.MA: {
      // 8 directions with 멱 (obstacle checking)
      const maSteps = [
        { eye: { r: r - 1, c }, dests: [{ r: r - 2, c: c - 1 }, { r: r - 2, c: c + 1 }] },
        { eye: { r: r + 1, c }, dests: [{ r: r + 2, c: c - 1 }, { r: r + 2, c: c + 1 }] },
        { eye: { r, c: c - 1 }, dests: [{ r: r - 1, c: c - 2 }, { r: r + 1, c: c - 2 }] },
        { eye: { r, c: c + 1 }, dests: [{ r: r - 1, c: c + 2 }, { r: r + 1, c: c + 2 }] },
      ];
      maSteps.forEach(({ eye, dests }) => {
        if (isInBoard(eye.r, eye.c) && board[eye.r][eye.c] === null) {
          dests.forEach(d => {
            if (isInBoard(d.r, d.c)) moves.push(d);
          });
        }
      });
      break;
    }

    case PIECE_TYPES.SANG: {
      // 8 directions with 2 멱 obstacles
      const sangSteps = [
        { eye1: { r: r - 1, c }, eye2s: [{ r: r - 2, c: c - 1, d: { r: r - 3, c: c - 2 } }, { r: r - 2, c: c + 1, d: { r: r - 3, c: c + 2 } }] },
        { eye1: { r: r + 1, c }, eye2s: [{ r: r + 2, c: c - 1, d: { r: r + 3, c: c - 2 } }, { r: r + 2, c: c + 1, d: { r: r + 3, c: c + 2 } }] },
        { eye1: { r, c: c - 1 }, eye2s: [{ r: r - 1, c: c - 2, d: { r: r - 2, c: c - 3 } }, { r: r + 1, c: c - 2, d: { r: r + 2, c: c - 3 } }] },
        { eye1: { r, c: c + 1 }, eye2s: [{ r: r - 1, c: c + 2, d: { r: r - 2, c: c + 3 } }, { r: r + 1, c: c + 2, d: { r: r + 2, c: c + 3 } }] },
      ];
      sangSteps.forEach(({ eye1, eye2s }) => {
        if (isInBoard(eye1.r, eye1.c) && board[eye1.r][eye1.c] === null) {
          eye2s.forEach(({ r: e2r, c: e2c, d }) => {
            if (isInBoard(e2r, e2c) && board[e2r][e2c] === null) {
              if (isInBoard(d.r, d.c)) moves.push(d);
            }
          });
        }
      });
      break;
    }

    case PIECE_TYPES.CHA: {
      // 4 orthogonal rays
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      dirs.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        while (isInBoard(nr, nc)) {
          moves.push({ r: nr, c: nc });
          if (board[nr][nc] !== null) break; // blocked
          nr += dr;
          nc += dc;
        }
      });

      // Palace diagonal movement for Cha
      if (isInPalace(r, c)) {
        const diags = getPalaceDiagonals(r, c);
        diags.forEach(pos => {
          moves.push(pos);
          // If stepping on center, can extend across the diagonal
          if ((r === 0 || r === 2 || r === 7 || r === 9) && (c === 3 || c === 5)) {
            if (board[pos.r][pos.c] === null) {
              const oppR = pos.r + (pos.r - r);
              const oppC = pos.c + (pos.c - c);
              if (isInPalace(oppR, oppC)) {
                moves.push({ r: oppR, c: oppC });
              }
            }
          }
        });
      }
      break;
    }

    case PIECE_TYPES.PO: {
      // 4 orthogonal rays jumping exactly ONE screen (screen cannot be Po, target cannot be Po)
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      dirs.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;
        let foundScreen = false;

        while (isInBoard(nr, nc)) {
          const unit = board[nr][nc];
          if (!foundScreen) {
            if (unit !== null) {
              // Check if screen contains a Po
              const hasPo = unit.pieces.some(p => p.type === PIECE_TYPES.PO);
              if (hasPo) break; // Cannot use Po as screen
              foundScreen = true;
            }
          } else {
            // After screen
            if (unit === null) {
              moves.push({ r: nr, c: nc });
            } else {
              // Found landing piece
              const hasPo = unit.pieces.some(p => p.type === PIECE_TYPES.PO);
              if (!hasPo) {
                moves.push({ r: nr, c: nc });
              }
              break; // Cannot jump past target
            }
          }
          nr += dr;
          nc += dc;
        }
      });

      // Palace diagonal jump for Po
      if (isInPalace(r, c)) {
        // Can jump across center if center has a non-Po screen
        if ((r === 0 && c === 3) || (r === 0 && c === 5) || (r === 2 && c === 3) || (r === 2 && c === 5) ||
            (r === 7 && c === 3) || (r === 7 && c === 5) || (r === 9 && c === 3) || (r === 9 && c === 5)) {
          const centerR = r <= 2 ? 1 : 8;
          const centerC = 4;
          const centerUnit = board[centerR][centerC];
          if (centerUnit && !centerUnit.pieces.some(p => p.type === PIECE_TYPES.PO)) {
            const oppR = centerR + (centerR - r);
            const oppC = centerC + (centerC - c);
            const targetUnit = board[oppR][oppC];
            if (!targetUnit || !targetUnit.pieces.some(p => p.type === PIECE_TYPES.PO)) {
              moves.push({ r: oppR, c: oppC });
            }
          }
        }
      }
      break;
    }

    default:
      break;
  }

  return moves;
}

/**
 * Filter moves by checking piece constraints
 * - cannot land on ally unless it's a valid fusion
 * - King & Guard cannot leave palace
 */
export function getLegalMovesForSinglePiece(board, r, c, piece, allowFusion = true) {
  const rawMoves = getRawPieceMoves(board, r, c, piece.type, piece.team);
  const legalMoves = [];

  rawMoves.forEach(dest => {
    const target = board[dest.r][dest.c];

    // Hard palace lock for King & Guard
    if (piece.type === PIECE_TYPES.KING || piece.type === PIECE_TYPES.SA) {
      if (!isInPalace(dest.r, dest.c, piece.team)) return;
    }

    if (target === null) {
      legalMoves.push({ ...dest, isFusion: false, isCapture: false });
    } else if (target.team !== piece.team) {
      // Enemy piece -> capture
      legalMoves.push({ ...dest, isFusion: false, isCapture: true, targetUnit: target });
    } else if (allowFusion && target.team === piece.team) {
      // Ally piece -> check if fusion is allowed
      if (canFuse(piece, target)) {
        legalMoves.push({ ...dest, isFusion: true, isCapture: false, targetUnit: target });
      }
    }
  });

  return legalMoves;
}

/**
 * Fusion validity check (Q1 & Q2 Audit Rules)
 * - Single pieces only (cannot fuse into an already stacked unit)
 * - Cost limit: sum <= 18
 * - Cha+Cha (26) & Cha+Po (20) are strictly banned
 * - King fusion exception: King can fuse with Sa (+180) or Ma inside palace
 */
export function canFuse(movingPiece, targetUnit) {
  if (!targetUnit || targetUnit.pieces.length !== 1) return false;
  const targetPiece = targetUnit.pieces[0];

  // Disallow Cha + Cha and Cha + Po
  if (
    (movingPiece.type === PIECE_TYPES.CHA && targetPiece.type === PIECE_TYPES.CHA) ||
    (movingPiece.type === PIECE_TYPES.CHA && targetPiece.type === PIECE_TYPES.PO) ||
    (movingPiece.type === PIECE_TYPES.PO && targetPiece.type === PIECE_TYPES.CHA)
  ) {
    return false;
  }

  // King special fusion (only inside palace, only with Sa or Ma)
  const hasKing = movingPiece.type === PIECE_TYPES.KING || targetPiece.type === PIECE_TYPES.KING;
  if (hasKing) {
    const otherPiece = movingPiece.type === PIECE_TYPES.KING ? targetPiece : movingPiece;
    return otherPiece.type === PIECE_TYPES.SA || otherPiece.type === PIECE_TYPES.MA;
  }

  // Cost limit check <= 18
  const totalWeight = movingPiece.weight + targetPiece.weight;
  return totalWeight <= 18;
}

/**
 * Get all available actions for a board unit (single or stacked)
 */
export function getUnitActions(board, r, c) {
  const unit = board[r][c];
  if (!unit) return { singleMoves: [], comboStep1Moves: [] };

  const isStacked = unit.pieces.length === 2;

  if (!isStacked) {
    // Single piece actions
    const piece = unit.pieces[0];
    const moves = getLegalMovesForSinglePiece(board, r, c, piece, true);
    return { isStacked: false, singleMoves: moves, comboStep1Moves: [] };
  }

  // Stacked unit [A, B]
  // Rule 1-A: Step 1 MUST move to an EMPTY cell (no capture on step 1)
  const pieceA = unit.pieces[0];
  const pieceB = unit.pieces[1];

  // Hard palace lock check: If unit has King or Guard, cannot leave palace
  const isPalaceLocked = unit.pieces.some(p => p.type === PIECE_TYPES.KING || p.type === PIECE_TYPES.SA);

  function getStep1Moves(piece, otherPiece, pieceIndex) {
    const raw = getRawPieceMoves(board, r, c, piece.type, unit.team);
    const valid = [];
    raw.forEach(dest => {
      // Must be empty
      if (board[dest.r][dest.c] !== null) return;
      // Palace lock
      if (isPalaceLocked && !isInPalace(dest.r, dest.c, unit.team)) return;
      valid.push({
        r: dest.r,
        c: dest.c,
        usedPiece: piece,
        remainingPiece: otherPiece,
        usedPieceIndex: pieceIndex,
      });
    });
    return valid;
  }

  const movesViaA = getStep1Moves(pieceA, pieceB, 0);
  const movesViaB = getStep1Moves(pieceB, pieceA, 1);

  return {
    isStacked: true,
    singleMoves: [],
    comboStep1Moves: {
      viaA: movesViaA,
      viaB: movesViaB,
    },
  };
}

/**
 * Get Step 2 moves from an intermediate cell for a stacked unit
 * Rule 1-A: Step 2 can move to empty OR capture enemy piece
 */
export function getComboStep2Moves(board, step1Dest, remainingPiece, originalUnit) {
  const isPalaceLocked = originalUnit.pieces.some(p => p.type === PIECE_TYPES.KING || p.type === PIECE_TYPES.SA);
  const raw = getRawPieceMoves(board, step1Dest.r, step1Dest.c, remainingPiece.type, originalUnit.team);
  const step2Moves = [];

  raw.forEach(dest => {
    if (isPalaceLocked && !isInPalace(dest.r, dest.c, originalUnit.team)) return;

    const target = board[dest.r][dest.c];
    if (target === null) {
      step2Moves.push({ ...dest, isCapture: false });
    } else if (target.team !== originalUnit.team) {
      step2Moves.push({ ...dest, isCapture: true, targetUnit: target });
    }
  });

  return step2Moves;
}

/**
 * Tactical Eject (사출 분리) moves
 * One piece is ejected and moves to a valid square, other piece stays behind.
 */
export function getEjectMoves(board, r, c, pieceIndexToEject) {
  const unit = board[r][c];
  if (!unit || unit.pieces.length !== 2) return [];

  const ejectPiece = unit.pieces[pieceIndexToEject];
  const stayPiece = unit.pieces[1 - pieceIndexToEject];

  const rawMoves = getRawPieceMoves(board, r, c, ejectPiece.type, unit.team);
  const legalMoves = [];

  rawMoves.forEach(dest => {
    // Palace check for ejectPiece
    if (ejectPiece.type === PIECE_TYPES.KING || ejectPiece.type === PIECE_TYPES.SA) {
      if (!isInPalace(dest.r, dest.c, unit.team)) return;
    }

    const target = board[dest.r][dest.c];
    if (target === null) {
      legalMoves.push({ ...dest, isCapture: false, ejectPiece, stayPiece });
    } else if (target.team !== unit.team) {
      legalMoves.push({ ...dest, isCapture: true, targetUnit: target, ejectPiece, stayPiece });
    }
  });

  return legalMoves;
}

/**
 * Check if King is alive on board
 */
export function isKingAlive(board, team) {
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 9; c++) {
      const unit = board[r][c];
      if (unit && unit.team === team) {
        if (unit.pieces.some(p => p.type === PIECE_TYPES.KING)) {
          return true;
        }
      }
    }
  }
  return false;
}
