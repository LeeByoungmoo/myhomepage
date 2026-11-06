import React, { useState, useEffect, useRef } from 'react';
import {
  TEAMS,
  PIECE_TYPES,
  PIECE_KANJI,
  PIECE_NAMES,
  createInitialBoard,
  cloneBoard,
  createUnit,
  getUnitActions,
  getComboStep2Moves,
  getEjectMoves,
  isKingAlive,
} from './janggiEngine';
import { soundEffects } from './janggiSounds';
import { getBestAiMove } from './janggiAi';
import { Volume2, VolumeX, RotateCcw, Bot, Users, HelpCircle, Check, ArrowRight } from 'lucide-react';
import './JanggiBoard.css';

const JanggiBoard = () => {
  const [board, setBoard] = useState(createInitialBoard);
  const [turn, setTurn] = useState(TEAMS.CHO); // Cho starts
  const [gameMode, setGameMode] = useState('AI'); // 'AI' | 'PVP'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showRules, setShowRules] = useState(false);

  // Interaction State
  const [selectedPos, setSelectedPos] = useState(null);
  const [singleMoves, setSingleMoves] = useState([]);
  const [comboStep1Moves, setComboStep1Moves] = useState({ viaA: [], viaB: [] });
  const [ejectMode, setEjectMode] = useState(false);
  const [ejectMoves, setEjectMoves] = useState([]);

  // Step 1 intermediate state
  const [step1State, setStep1State] = useState(null);
  // { originalPos: {r,c}, currentPos: {r,c}, boardBeforeStep1, usedPiece, remainingPiece }
  const [step2Moves, setStep2Moves] = useState([]);

  // Hover ghost preview for Step 1
  const [hoveredStep1, setHoveredStep1] = useState(null);
  const [ghostStep2Moves, setGhostStep2Moves] = useState([]);

  const isAiThinkingRef = useRef(false);
  const aiTimerRef = useRef(null);

  // Play sound helper
  const playSfx = (fn) => {
    if (soundEnabled && fn) fn();
  };

  // Reset Game
  const resetGame = () => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    isAiThinkingRef.current = false;
    setBoard(createInitialBoard());
    setTurn(TEAMS.CHO);
    setWinner(null);
    clearSelection();
    playSfx(soundEffects.playMove);
  };

  const clearSelection = () => {
    setSelectedPos(null);
    setSingleMoves([]);
    setComboStep1Moves({ viaA: [], viaB: [] });
    setEjectMode(false);
    setEjectMoves([]);
    setStep1State(null);
    setStep2Moves([]);
    setHoveredStep1(null);
    setGhostStep2Moves([]);
  };

  // Check Game Over
  const checkGameOver = (currentBoard) => {
    const choKing = isKingAlive(currentBoard, TEAMS.CHO);
    const hanKing = isKingAlive(currentBoard, TEAMS.HAN);
    if (!choKing) {
      setWinner(TEAMS.HAN);
      playSfx(soundEffects.playVictory);
      return true;
    }
    if (!hanKing) {
      setWinner(TEAMS.CHO);
      playSfx(soundEffects.playVictory);
      return true;
    }
    return false;
  };

  // Handle cell click
  const handleCellClick = (r, c) => {
    if (winner || isAiThinkingRef.current) return;

    // In step 1 moved state -> can only click Step 2 destinations
    if (step1State) {
      const matchStep2 = step2Moves.find(m => m.r === r && m.c === c);
      if (matchStep2) {
        executeStep2(matchStep2);
      }
      return;
    }

    const clickedUnit = board[r][c];

    // Case 1: Selecting own piece
    if (clickedUnit && clickedUnit.team === turn) {
      selectUnit(r, c);
      return;
    }

    // Case 2: Selected piece exists, clicking destination
    if (selectedPos) {
      // Eject mode
      if (ejectMode) {
        const matchEject = ejectMoves.find(m => m.r === r && m.c === c);
        if (matchEject) {
          executeEject(matchEject);
          return;
        }
      }

      // Single move / Fusion
      const matchSingle = singleMoves.find(m => m.r === r && m.c === c);
      if (matchSingle) {
        executeSingleMove(matchSingle);
        return;
      }

      // Combo Step 1
      const matchA = comboStep1Moves.viaA.find(m => m.r === r && m.c === c);
      const matchB = comboStep1Moves.viaB.find(m => m.r === r && m.c === c);
      if (matchA || matchB) {
        executeStep1(matchA || matchB);
        return;
      }
    }

    // Otherwise clear selection
    clearSelection();
  };

  // Select a unit
  const selectUnit = (r, c) => {
    clearSelection();
    setSelectedPos({ r, c });

    const actions = getUnitActions(board, r, c);
    if (!actions.isStacked) {
      setSingleMoves(actions.singleMoves);
    } else {
      setComboStep1Moves(actions.comboStep1Moves);
      // Pre-calculate eject moves for piece 0 as default
      const eMoves = getEjectMoves(board, r, c, 0);
      setEjectMoves(eMoves);
    }
    playSfx(soundEffects.playMove);
  };

  // Execute single piece move or fusion
  const executeSingleMove = (move) => {
    const newBoard = cloneBoard(board);
    const movingUnit = newBoard[selectedPos.r][selectedPos.c];
    newBoard[selectedPos.r][selectedPos.c] = null;

    if (move.isFusion) {
      const targetUnit = newBoard[move.r][move.c];
      newBoard[move.r][move.c] = createUnit(targetUnit.team, [...targetUnit.pieces, ...movingUnit.pieces]);
      playSfx(soundEffects.playFusion);
    } else {
      newBoard[move.r][move.c] = movingUnit;
      if (move.isCapture) {
        playSfx(soundEffects.playCapture);
      } else {
        playSfx(soundEffects.playMove);
      }
    }

    setBoard(newBoard);
    clearSelection();
    if (!checkGameOver(newBoard)) {
      setTurn(turn === TEAMS.CHO ? TEAMS.HAN : TEAMS.CHO);
    }
  };

  // Execute Step 1 of Combo
  const executeStep1 = (step1Move) => {
    const simBoard = cloneBoard(board);
    const movingUnit = simBoard[selectedPos.r][selectedPos.c];
    simBoard[selectedPos.r][selectedPos.c] = null;
    simBoard[step1Move.r][step1Move.c] = movingUnit;

    const s2Moves = getComboStep2Moves(
      simBoard,
      { r: step1Move.r, c: step1Move.c },
      step1Move.remainingPiece,
      movingUnit
    );

    setBoard(simBoard);
    setStep1State({
      originalPos: selectedPos,
      currentPos: { r: step1Move.r, c: step1Move.c },
      boardBeforeStep1: cloneBoard(board),
      usedPiece: step1Move.usedPiece,
      remainingPiece: step1Move.remainingPiece,
    });
    setStep2Moves(s2Moves);
    setSingleMoves([]);
    setComboStep1Moves({ viaA: [], viaB: [] });
    playSfx(soundEffects.playStep1);
  };

  // Execute Step 2 of Combo
  const executeStep2 = (step2Move) => {
    const newBoard = cloneBoard(board);
    const movingUnit = newBoard[step1State.currentPos.r][step1State.currentPos.c];
    newBoard[step1State.currentPos.r][step1State.currentPos.c] = null;
    newBoard[step2Move.r][step2Move.c] = movingUnit;

    if (step2Move.isCapture) {
      playSfx(soundEffects.playCapture);
    } else {
      playSfx(soundEffects.playMove);
    }

    setBoard(newBoard);
    clearSelection();
    if (!checkGameOver(newBoard)) {
      setTurn(turn === TEAMS.CHO ? TEAMS.HAN : TEAMS.CHO);
    }
  };

  // Finish turn after Step 1 only
  const handleStopAtStep1 = () => {
    if (!step1State) return;
    clearSelection();
    playSfx(soundEffects.playMove);
    if (!checkGameOver(board)) {
      setTurn(turn === TEAMS.CHO ? TEAMS.HAN : TEAMS.CHO);
    }
  };

  // Undo Step 1
  const handleUndoStep1 = () => {
    if (!step1State) return;
    setBoard(step1State.boardBeforeStep1);
    const orig = step1State.originalPos;
    clearSelection();
    selectUnit(orig.r, orig.c);
    playSfx(soundEffects.playMove);
  };

  // Toggle Eject Mode
  const toggleEjectMode = () => {
    if (!selectedPos) return;
    const nextMode = !ejectMode;
    setEjectMode(nextMode);
    if (nextMode) {
      const eMoves = getEjectMoves(board, selectedPos.r, selectedPos.c, 0);
      setEjectMoves(eMoves);
    }
    playSfx(soundEffects.playMove);
  };

  // Execute Eject
  const executeEject = (ejectMove) => {
    const newBoard = cloneBoard(board);
    const unit = newBoard[selectedPos.r][selectedPos.c];
    newBoard[selectedPos.r][selectedPos.c] = createUnit(unit.team, ejectMove.stayPiece);
    newBoard[ejectMove.r][ejectMove.c] = createUnit(unit.team, ejectMove.ejectPiece);

    if (ejectMove.isCapture) {
      playSfx(soundEffects.playCapture);
    } else {
      playSfx(soundEffects.playMove);
    }

    setBoard(newBoard);
    clearSelection();
    if (!checkGameOver(newBoard)) {
      setTurn(turn === TEAMS.CHO ? TEAMS.HAN : TEAMS.CHO);
    }
  };

  // Step 1 Hover for ghost Step 2 preview
  const handleStep1Hover = (pos, remainingPiece) => {
    setHoveredStep1(pos);
    if (!pos || !selectedPos) {
      setGhostStep2Moves([]);
      return;
    }
    const simBoard = cloneBoard(board);
    const movingUnit = simBoard[selectedPos.r][selectedPos.c];
    simBoard[selectedPos.r][selectedPos.c] = null;
    simBoard[pos.r][pos.c] = movingUnit;

    const s2 = getComboStep2Moves(simBoard, pos, remainingPiece, movingUnit);
    setGhostStep2Moves(s2);
  };

  // AI Turn Execution
  useEffect(() => {
    if (gameMode === 'AI' && turn === TEAMS.HAN && !winner) {
      isAiThinkingRef.current = true;
      aiTimerRef.current = setTimeout(() => {
        const bestMove = getBestAiMove(board, TEAMS.HAN);
        if (bestMove) {
          applyAiMove(bestMove);
        }
        isAiThinkingRef.current = false;
      }, 500);

      return () => {
        if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      };
    }
  }, [turn, gameMode, winner, board]);

  // Apply AI move on board
  const applyAiMove = (m) => {
    const newBoard = cloneBoard(board);

    if (m.type === 'SINGLE_MOVE' || m.type === 'FUSION') {
      const unit = newBoard[m.from.r][m.from.c];
      newBoard[m.from.r][m.from.c] = null;
      if (m.type === 'FUSION') {
        const destUnit = newBoard[m.to.r][m.to.c];
        newBoard[m.to.r][m.to.c] = createUnit(destUnit.team, [...destUnit.pieces, ...unit.pieces]);
        playSfx(soundEffects.playFusion);
      } else {
        newBoard[m.to.r][m.to.c] = unit;
        if (m.isCapture) playSfx(soundEffects.playCapture);
        else playSfx(soundEffects.playMove);
      }
    } else if (m.type === 'COMBO_FULL') {
      const unit = newBoard[m.from.r][m.from.c];
      newBoard[m.from.r][m.from.c] = null;
      newBoard[m.step2.r][m.step2.c] = unit;
      if (m.isCapture) playSfx(soundEffects.playCapture);
      else playSfx(soundEffects.playMove);
    } else if (m.type === 'COMBO_STOP_1') {
      const unit = newBoard[m.from.r][m.from.c];
      newBoard[m.from.r][m.from.c] = null;
      newBoard[m.step1.r][m.step1.c] = unit;
      playSfx(soundEffects.playMove);
    } else if (m.type === 'EJECT') {
      const unit = newBoard[m.from.r][m.from.c];
      const ejectPiece = unit.pieces[m.ejectPieceIndex];
      const stayPiece = unit.pieces[1 - m.ejectPieceIndex];
      newBoard[m.from.r][m.from.c] = createUnit(unit.team, stayPiece);
      newBoard[m.to.r][m.to.c] = createUnit(unit.team, ejectPiece);
      if (m.isCapture) playSfx(soundEffects.playCapture);
      else playSfx(soundEffects.playMove);
    }

    setBoard(newBoard);
    clearSelection();
    if (!checkGameOver(newBoard)) {
      setTurn(TEAMS.CHO);
    }
  };

  return (
    <div className="janggi-container">
      {/* Top Header Bar */}
      <div className="janggi-header">
        <div className="title-badge">
          <h2>연격 장기</h2>
          <span className="sub-tag">Double-Strike</span>
        </div>

        <div className="turn-status-banner">
          <div className={`turn-indicator-dot ${turn}`} />
          <span>{turn === TEAMS.CHO ? '초(楚) 차례' : '한(漢) 차례'}</span>
        </div>

        <div className="controls-group">
          <button
            className={`btn-ctrl ${gameMode === 'AI' ? 'active' : ''}`}
            onClick={() => setGameMode(gameMode === 'AI' ? 'PVP' : 'AI')}
          >
            {gameMode === 'AI' ? <Bot size={16} /> : <Users size={16} />}
            {gameMode === 'AI' ? 'vs AI' : '2인용'}
          </button>

          <button className="btn-ctrl" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button className="btn-ctrl" onClick={() => setShowRules(true)}>
            <HelpCircle size={16} /> 룰
          </button>

          <button className="btn-ctrl" onClick={resetGame}>
            <RotateCcw size={16} /> 재시작
          </button>
        </div>
      </div>

      {/* Main Board Area */}
      <div className="board-wrapper">
        <div className="janggi-board">
          {/* SVG Grid Overlay */}
          <svg className="board-svg-overlay" viewBox="0 0 540 600">
            {/* Horizontal grid lines */}
            {Array.from({ length: 10 }).map((_, r) => (
              <line
                key={`h-${r}`}
                x1={30}
                y1={30 + r * 60}
                x2={510}
                y2={30 + r * 60}
                stroke="#2a3b53"
                strokeWidth="1.5"
              />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 9 }).map((_, c) => (
              <line
                key={`v-${c}`}
                x1={30 + c * 60}
                y1={30}
                x2={30 + c * 60}
                y2={570}
                stroke="#2a3b53"
                strokeWidth="1.5"
              />
            ))}

            {/* Han Palace Diagonals (X) */}
            <line x1={210} y1={30} x2={330} y2={150} stroke="#ff0055" strokeWidth="1.5" opacity="0.6" />
            <line x1={330} y1={30} x2={210} y2={150} stroke="#ff0055" strokeWidth="1.5" opacity="0.6" />

            {/* Cho Palace Diagonals (X) */}
            <line x1={210} y1={450} x2={330} y2={570} stroke="#00f0ff" strokeWidth="1.5" opacity="0.6" />
            <line x1={330} y1={450} x2={210} y2={570} stroke="#00f0ff" strokeWidth="1.5" opacity="0.6" />
          </svg>

          {/* Grid Cells & Pieces */}
          {board.map((row, r) =>
            row.map((unit, c) => {
              const isSelected = selectedPos && selectedPos.r === r && selectedPos.c === c;
              const isSingleMove = singleMoves.some(m => m.r === r && m.c === c && !m.isFusion && !m.isCapture);
              const isCapture = singleMoves.some(m => m.r === r && m.c === c && m.isCapture);
              const isFusion = singleMoves.some(m => m.r === r && m.c === c && m.isFusion);

              const step1A = comboStep1Moves.viaA.find(m => m.r === r && m.c === c);
              const step1B = comboStep1Moves.viaB.find(m => m.r === r && m.c === c);

              const isStep2Dest = step2Moves.some(m => m.r === r && m.c === c);
              const isGhostStep2 = ghostStep2Moves.some(m => m.r === r && m.c === c);
              const isEjectDest = ejectMode && ejectMoves.some(m => m.r === r && m.c === c);

              return (
                <div
                  key={`${r}-${c}`}
                  className={`board-cell ${r <= 2 && c >= 3 && c <= 5 ? 'in-palace-han' : ''} ${
                    r >= 7 && c >= 3 && c <= 5 ? 'in-palace-cho' : ''
                  }`}
                  onClick={() => handleCellClick(r, c)}
                >
                  {/* Unit Disc */}
                  {unit && (
                    <div
                      className={`piece-disc ${unit.team} ${unit.pieces.length === 2 ? 'is-stacked' : ''} ${
                        unit.pieces.some(p => p.type === PIECE_TYPES.KING) ? 'is-king' : ''
                      } ${isSelected ? 'selected' : ''}`}
                    >
                      {unit.pieces.length === 1 ? (
                        <span className="single-kanji">
                          {PIECE_KANJI[unit.team][unit.pieces[0].type]}
                        </span>
                      ) : (
                        <div className="split-badge">
                          <span className="split-kanji-1">
                            {PIECE_KANJI[unit.team][unit.pieces[0].type]}
                          </span>
                          <div className="split-divider" />
                          <span className="split-kanji-2">
                            {PIECE_KANJI[unit.team][unit.pieces[1].type]}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Move Indicators */}
                  {isSingleMove && <div className="move-marker single-move" />}
                  {isCapture && <div className="move-marker capture" />}
                  {isFusion && <div className="move-marker fusion" />}
                  {isEjectDest && <div className="move-marker capture" />}

                  {/* Combo Step 1 Markers */}
                  {step1A && (
                    <div
                      className="move-marker step1-via-a"
                      onMouseEnter={() => handleStep1Hover({ r, c }, step1A.remainingPiece)}
                      onMouseLeave={() => handleStep1Hover(null, null)}
                    />
                  )}
                  {step1B && (
                    <div
                      className="move-marker step1-via-b"
                      onMouseEnter={() => handleStep1Hover({ r, c }, step1B.remainingPiece)}
                      onMouseLeave={() => handleStep1Hover(null, null)}
                    />
                  )}

                  {/* Step 2 Real & Ghost Indicators */}
                  {isStep2Dest && <div className="move-marker step2-dest" />}
                  {isGhostStep2 && !step1State && (
                    <div className="move-marker" style={{ border: '2px dashed #facc15', opacity: 0.6 }} />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Floating Action Controls after Step 1 Move */}
        {step1State && (
          <div className="floating-action-bar">
            <button className="btn-floating stop" onClick={handleStopAtStep1}>
              <Check size={16} /> 1타로 턴 종료
            </button>
            <button className="btn-floating undo" onClick={handleUndoStep1}>
              <RotateCcw size={16} /> 1타 무르기
            </button>
          </div>
        )}

        {/* Eject Toggle Bar when Stacked Unit Selected */}
        {selectedPos && board[selectedPos.r][selectedPos.c]?.pieces.length === 2 && !step1State && (
          <div className="floating-action-bar" style={{ bottom: '-55px' }}>
            <button
              className={`btn-floating ${ejectMode ? 'stop' : 'undo'}`}
              onClick={toggleEjectMode}
            >
              {ejectMode ? '⚡ 연격 모드로 전환' : '🔓 전술 사출(분리 모드)'}
            </button>
          </div>
        )}
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="game-modal-overlay" onClick={() => setShowRules(false)}>
          <div className="game-modal-card" onClick={e => e.stopPropagation()}>
            <h2>연격 장기 핵심 룰</h2>
            <div style={{ textAlign: 'left', lineHeight: '1.7', color: '#cbd5e1', fontSize: '0.95rem' }}>
              <p>⚡ <strong>기물 합체 (Fusion)</strong>: 아군 말이 있는 칸으로 이동하여 하나로 합체 (1턴 소모). 점수 18점 이하만 합체 가능 (차+차, 차+포 금지).</p>
              <p>🎯 <strong>연격 (Double Action)</strong>: 합체된 말은 1턴에 2연속 이동! <strong>1타는 빈칸 이동만 가능(포획 불가)</strong>하며, <strong>2타에서 적 기물을 포획</strong>할 수 있습니다.</p>
              <p>🛡️ <strong>궁성 절대 구속</strong>: 궁이나 사가 합체된 말은 어떤 행마를 쓰더라도 궁성(3×3) 밖으로 나갈 수 없습니다.</p>
              <p>🔓 <strong>전술 사출 (Detach)</strong>: 합체된 말에서 한 기물만 밖으로 사출하여 이동시키고 턴을 마칠 수 있습니다.</p>
              <p>💥 <strong>동시 사망</strong>: 합체된 말이 먹히면 두 기물이 동시에 사망하며, 궁이 먹히면 즉시 패배합니다.</p>
            </div>
            <button className="btn-modal" style={{ marginTop: '1.5rem' }} onClick={() => setShowRules(false)}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {winner && (
        <div className="game-modal-overlay">
          <div className="game-modal-card">
            <h2>{winner === TEAMS.CHO ? '초(楚) 승리!' : '한(漢) 승리!'}</h2>
            <p>상대방의 궁(王)을 제압하여 대국에서 승리하였습니다.</p>
            <button className="btn-modal" onClick={resetGame}>
              새 대국 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JanggiBoard;
