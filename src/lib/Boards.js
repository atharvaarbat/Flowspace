// Using localStorage instead of indexedDB to save data

export function saveBoardData(board) {
    // Ensure the board has a liked field, defaulting to false if not provided
    if (board.liked === undefined) {
        board.liked = false;
    }
    
    // Add a date-time field to the board with the current date and time
    board.dateTime = new Date().toISOString();

    // Add a trashed field to the board, defaulting to false
    board.trashed = false;

    // Save board data to localStorage
    localStorage.setItem('board_' + board.id, JSON.stringify(board));
}

export function loadBoardData() {
    // Load all board data from localStorage
    const boards = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('board_')) {
            const board = JSON.parse(localStorage.getItem(key));
            boards.push(board);
        }
    }
    return boards;
}

export function updateBoardLikeStatus(boardId, likeStatus) {
    // Update the like status of a board in localStorage
    const board = JSON.parse(localStorage.getItem('board_' + boardId));
    if (board) {
        board.liked = likeStatus;
        localStorage.setItem('board_' + boardId, JSON.stringify(board));
    }
}

export function getBoardLikeStatus(boardId) {
    // Get the like status of a board from localStorage
    const board = JSON.parse(localStorage.getItem('board_' + boardId));
    if (board) {
        return board.liked;
    }
    return null;
}

export function updateBoardTrashedStatus(boardId, trashedStatus) {
    // Update the trashed status of a board in localStorage
    const board = JSON.parse(localStorage.getItem('board_' + boardId));
    if (board) {
        board.trashed = trashedStatus;
        localStorage.setItem('board_' + boardId, JSON.stringify(board));
    }
}

export function fetchBoardLists() {
    // Fetch all board lists from localStorage
    const boards = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('board_')) {
            const board = JSON.parse(localStorage.getItem(key));
            boards.push(board);
        }
    }
    return boards;
}

export function deleteBoardPrmnt(boardId) {
    // Delete a board from localStorage
    
    localStorage.removeItem('board_' + boardId);
    window.location.reload()
}
