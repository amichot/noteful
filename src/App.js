//dependencies
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
//components
import MainMain from "./main/MainMain";
import MainSidebar from "./sidebar/MainSidebar";
import NoteSidebar from "./sidebar/NoteSidebar";
import NoteMain from "./main/NoteMain";
import AddFolder from "./addFolder/AddFolder";
import AddNote from "./addNote/AddNote";
import NoteError from "./errorboundary/NoteError";
//Context
import NotefulsContext from "./NotefulsContext";
//css
import "./App.css";

class App extends Component {
	state = {
		notes: [],
		folders: [],
		error: null
	};

	setFolder = folders => {
		this.setState({ folders: [...folders, { id: 5 }], error: null });
	};

	setNotes = notes => {
		this.setState({ notes, error: null });
	};

	handleDeleteNote = noteId => {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		});
	};

	componentDidMount() {
		fetch("http://localhost:9090/folders")
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(this.setFolder);

		fetch("http://localhost:9090/notes")
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(this.setNotes);
	}

	handleAddFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		});
	};

	handleAddNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		});
	};

	handleDeleteNote = noteId => {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		});
	};

	renderNavRoutes() {
		return (
			<>
				{["/", "/folder/:folderId"].map(path => (
					<Route exact key={path} path={path} component={MainSidebar} />
				))}

				<Route path='/note/:noteId' component={NoteSidebar} />
				<Route path='/add-folder' component={NoteSidebar} />
				<Route path='/add-note' component={NoteSidebar} />
			</>
		);
	}

	renderMainRoutes() {
		return (
			<>
				{["/", "/folder/:folderId"].map(path => (
					<Route exact key={path} path={path} component={MainMain} />
				))}

				<Route path='/note/:noteId' component={NoteMain} />
				<Route path='/add-folder' component={AddFolder} />
				<Route path='/add-note' component={AddNote} />
			</>
		);
	}

	render() {
		const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNote: this.handleDeleteNote,
			addFolder: this.handleAddFolder,
			addNote: this.handleAddNote
		};

		return (
			<NotefulsContext.Provider value={contextValue}>
				<div className='App'>
					<NoteError>
						<nav className='App__nav'>{this.renderNavRoutes()}</nav>
					</NoteError>
					<header className='App__header'>
						<h1>
							<Link to='/'>Noteful</Link>
						</h1>
					</header>
					<NoteError>
						<main className='App__main'>{this.renderMainRoutes()}</main>
					</NoteError>
				</div>
			</NotefulsContext.Provider>
		);
	}
}

export default App;
