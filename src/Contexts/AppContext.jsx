import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({}); // Initialize state here

  const [boards, setBoards] = useState([]); // To store the list of boards
  const [currentBoard, setCurrentBoard] = useState(null); // To store the currently selected board
  const [tasks, setTasks] = useState({}); // To store tasks, with board IDs as keys
  const [columns, setColumns] = useState({}); // To store columns for each board, with board IDs as keys
  const [isDragging, setIsDragging] = useState(false); // To manage drag state

  return (
    <AppContext.Provider value={{
      state, setState,
      boards, setBoards,
      currentBoard, setCurrentBoard,
      tasks, setTasks,
      columns, setColumns,
      isDragging, setIsDragging
    }}>
      {children}
    </AppContext.Provider>
  );
};