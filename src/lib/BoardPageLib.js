import { toast } from "react-toastify";
import { format } from "date-fns";
// Function to fetch lists of the board saved in localStorage
export function fetchBoardLists(boardId) {
    const boardslist = JSON.parse(localStorage.getItem('boards')) || [];
    const board = boardslist.find(board => board.id == boardId);
    return Promise.resolve(board);
}

// Function to get board details from localStorage
export function getBoardDetails(boardId) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];
    
    return board;
}

// Function to get board lists from localStorage
export function getBoardLists(boardId) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];
    const boardLists = board.lists || [];
    
    return boardLists
}

// Function to get a specific list from a board in localStorage
export function getBoardList(boardId, listIndex) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];
    const boardLists = board.lists || [];
    
    return boardLists[listIndex]
}

// Function to add a list item to a board in localStorage
export function addListItem(boardId, listIndex, listItemType, content) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];
    

    if (board) {
        const updatedLists = [...board.lists];
        updatedLists[listIndex].listData.push({ type: listItemType, content: content });
        board.lists = updatedLists;

        localStorage.setItem('board_' + boardId, JSON.stringify(board));
        window.location.reload()
        
        return Promise.resolve('List item added successfully');
    } else {
        return Promise.reject('Board not found');
    }
}


// Function to delete a list from a board in localStorage
export function deleteBoardList(boardId, listIndex) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];

    if (board) {
        const updatedLists = [...board.lists];
        updatedLists.splice(listIndex, 1);
        board.lists = updatedLists;

        localStorage.setItem('board_' + boardId, JSON.stringify(board));
        window.location.reload();

        return Promise.resolve('List deleted successfully');
    } else {
        return Promise.reject('Board not found');
    }
}
// Function to delete a list item from a list in a board in localStorage
export function deleteBoardListItem(boardId, listIndex, itemIndex) {
    
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || [];
    
    if (board) {
        const updatedLists = [...board.lists];
        updatedLists[listIndex].listData.splice(itemIndex, 1);
        board.lists = updatedLists;

        localStorage.setItem('board_' + boardId, JSON.stringify(board));
        window.location.reload();

        return Promise.resolve('List item deleted successfully');
    } else {
        return Promise.reject('Board not found');
    }
}

// Function to add a list to a board in localStorage
export function addBoardList(boardId, newList) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || { lists: [] };

    if (board) {
        const updatedLists = [...board.lists];
        updatedLists.push(newList);
        board.lists = updatedLists;

        localStorage.setItem('board_' + boardId, JSON.stringify(board));

        window.location.reload();
        toast.done('A list added')

        return Promise.resolve('List added successfully');
    } else {
        return Promise.reject('Board not found');
    }
}
export function boardDateTime(boardId) {
    const board = JSON.parse(localStorage.getItem('board_' + boardId)) || { lists: [] };

    if (board) {
        const rawDT = board.dateTime
        return format(new Date(rawDT), 'dd MMMM yyyy')
    } else {
        return Promise.reject('Board not found');
    }
}
