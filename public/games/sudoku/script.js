document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('sudoku-board');
    const newGameBtn = document.getElementById('new-game-btn');
    const difficultySelect = document.getElementById('difficulty');
    const numBtns = document.querySelectorAll('.num-btn');
    const eraseBtn = document.getElementById('erase-btn');
    const winModal = document.getElementById('win-modal');
    const modalNewGameBtn = document.getElementById('modal-new-game-btn');

    let currentPuzzle = [];
    let currentSolution = [];
    let selectedCell = null;

    // --- Sudoku Generator Logic ---
    function generateSudoku(difficulty) {
        let board = Array(9).fill().map(() => Array(9).fill(0));
        
        function isValid(board, row, col, num) {
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === num) return false;
                if (board[i][col] === num) return false;
                let boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
                let boxCol = Math.floor(col / 3) * 3 + i % 3;
                if (board[boxRow][boxCol] === num) return false;
            }
            return true;
        }

        function solve(board) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0) {
                        let nums = [1,2,3,4,5,6,7,8,9];
                        nums.sort(() => Math.random() - 0.5); // Randomize
                        for (let num of nums) {
                            if (isValid(board, row, col, num)) {
                                board[row][col] = num;
                                if (solve(board)) return true;
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        // Generate a fully solved board
        solve(board);
        let solvedBoard = board.map(row => [...row]);

        // Determine number of cells to remove
        let removeCount = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 55;
        let puzzleBoard = board.map(row => [...row]);
        
        // Remove cells to create puzzle
        while(removeCount > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (puzzleBoard[row][col] !== 0) {
                puzzleBoard[row][col] = 0;
                removeCount--;
            }
        }

        return { puzzle: puzzleBoard, solution: solvedBoard };
    }

    // --- UI Logic ---
    function initGame() {
        winModal.classList.add('hidden');
        const { puzzle, solution } = generateSudoku(difficultySelect.value);
        currentPuzzle = puzzle;
        currentSolution = solution;
        selectedCell = null;
        renderBoard();
    }

    function renderBoard() {
        boardEl.innerHTML = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                const val = currentPuzzle[row][col];
                if (val !== 0) {
                    cell.textContent = val;
                    cell.classList.add('fixed');
                }

                cell.addEventListener('click', () => selectCell(cell, row, col));
                boardEl.appendChild(cell);
            }
        }
    }

    function selectCell(cell, row, col) {
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('selected', 'highlighted');
        });
        
        cell.classList.add('selected');
        selectedCell = cell;

        const val = cell.textContent;
        if (val) {
            document.querySelectorAll('.cell').forEach(c => {
                if (c.textContent === val) {
                    c.classList.add('highlighted');
                }
            });
        }
    }

    function handleInput(num) {
        if (!selectedCell || selectedCell.classList.contains('fixed')) return;
        
        const row = selectedCell.dataset.row;
        const col = selectedCell.dataset.col;
        
        selectedCell.textContent = num;
        selectedCell.classList.remove('error');

        // Check if correct against solution
        if (num != currentSolution[row][col]) {
            selectedCell.classList.add('error');
        } else {
            currentPuzzle[row][col] = parseInt(num);
            selectCell(selectedCell, row, col); // Update highlights
            checkWin();
        }
    }

    function eraseCell() {
        if (!selectedCell || selectedCell.classList.contains('fixed')) return;
        selectedCell.textContent = '';
        selectedCell.classList.remove('error');
        currentPuzzle[selectedCell.dataset.row][selectedCell.dataset.col] = 0;
        selectCell(selectedCell, selectedCell.dataset.row, selectedCell.dataset.col);
    }

    function checkWin() {
        let isWin = true;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (currentPuzzle[row][col] !== currentSolution[row][col]) {
                    isWin = false;
                    break;
                }
            }
        }
        if (isWin) {
            setTimeout(() => {
                winModal.classList.remove('hidden');
            }, 300);
        }
    }

    // --- Event Listeners ---
    newGameBtn.addEventListener('click', initGame);
    modalNewGameBtn.addEventListener('click', initGame);
    difficultySelect.addEventListener('change', initGame);
    
    numBtns.forEach(btn => {
        btn.addEventListener('click', () => handleInput(btn.textContent));
    });
    
    eraseBtn.addEventListener('click', eraseCell);

    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '9') {
            handleInput(e.key);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            eraseCell();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (!selectedCell) return;
            let r = parseInt(selectedCell.dataset.row);
            let c = parseInt(selectedCell.dataset.col);
            if (e.key === 'ArrowUp') r = Math.max(0, r - 1);
            if (e.key === 'ArrowDown') r = Math.min(8, r + 1);
            if (e.key === 'ArrowLeft') c = Math.max(0, c - 1);
            if (e.key === 'ArrowRight') c = Math.min(8, c + 1);
            
            const nextCell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            if (nextCell) selectCell(nextCell, r, c);
        }
    });

    // Start initial game
    initGame();
});
