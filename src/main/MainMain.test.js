import React from "react";
import ReactDOM from "react-dom";
import MainMain from "./MainMain";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<MainMain />, div);
	ReactDOM.unmountComponentAtNode(div);
});
