import React from "react";

const NotefulsContext = React.createContext({
	folders: [],
	notes: [],
	deleteNote: () => {}
});

export default NotefulsContext;
