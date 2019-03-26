import React from "react";
import ReactDOM from "react-dom";
import MainSidebar from "./MainSidebar";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<MainSidebar />, div);
	ReactDOM.unmountComponentAtNode(div);
});
