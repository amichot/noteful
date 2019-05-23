import React from 'react';

const NotefulsContext = React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
});

export default NotefulsContext;
