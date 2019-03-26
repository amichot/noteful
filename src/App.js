//dependencies
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
//components
import MainMain from "./main/MainMain";
import MainSidebar from "./sidebar/MainSidebar";
import NoteSidebar from "./sidebar/NoteSidebar";
import NoteMain from "./main/NoteMain";

//helper functions
import { getNotesForFolder, findNote, findFolder } from "./notes-helpers";
//state
import dummyStore from "./dummy-store";
//css
import "./App.css";

class App extends Component {
	state = {
		notes: [],
		folders: []
	};
	componentDidMount() {
		setTimeout(() => this.setState(dummyStore), 600);
	}

	renderNavRoutes() {
		const { notes, folders } = this.state;
		return (
			<>
				{["/", "/folder/:folderId"].map(path => (
					<Route
						exact
						key={path}
						path={path}
						render={routeProps => (
							<MainSidebar folders={folders} {...routeProps} />
						)}
					/>
				))}

				<Route
					path='/note/:noteId'
					render={routeProps => {
						const { noteId } = routeProps.match.params;
						const note = findNote(notes, noteId) || {};
						const folder = findFolder(folders, note);
						//	console.log(folder);
						return <NoteSidebar folder={folder} {...routeProps} />;
					}}
				/>
			</>
		);
	}

	renderMainRoutes() {
		const { notes } = this.state;
		return (
			<>
				{["/", "/folder/:folderId"].map(path => (
					<Route
						exact
						key={path}
						path={path}
						render={routeProps => {
							const { folderId } = routeProps.match.params;
							const notesForFolders = getNotesForFolder(notes, folderId);
							return <MainMain notes={notesForFolders} {...routeProps} />;
						}}
					/>
				))}

				<Route
					path='/note/:noteId'
					render={routeProps => {
						const { noteId } = routeProps.match.params;
						const note = findNote(notes, noteId) || {};
						//	console.log(folder);
						return <NoteMain note={note} {...routeProps} />;
					}}
				/>
			</>
		);
	}

	render() {
		return (
			<div className='App'>
				<nav className='App__nav'>{this.renderNavRoutes()}</nav>
				<header className='App__header'>
					<h1>
						<Link to='/'>Noteful</Link>
					</h1>
				</header>
				<main className='App__main'>{this.renderMainRoutes()}</main>
			</div>
		);
	}
}

export default App;
