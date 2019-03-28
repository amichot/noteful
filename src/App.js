//dependencies
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
//components
import MainMain from "./main/MainMain";
import MainSidebar from "./sidebar/MainSidebar";
import NoteSidebar from "./sidebar/NoteSidebar";
import NoteMain from "./main/NoteMain";
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
		this.setState({ folders, error: null });
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

	handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

	renderNavRoutes() {
		return (
			<>
				{["/", "/folder/:folderId"].map(path => (
					<Route exact key={path} path={path} component={MainSidebar} />
				))}

				<Route path='/note/:noteId' component={NoteSidebar} />
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
			</>
		);
	}

	render() {
		const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNote: this.handleDeleteNote
		};
		
		return (
			<NotefulsContext.Provider value={contextValue}>
				<div className='App'>
					<nav className='App__nav'>{this.renderNavRoutes()}</nav>
					<header className='App__header'>
						<h1>
							<Link to='/'>Noteful</Link>
						</h1>
					</header>
					<main className='App__main'>{this.renderMainRoutes()}</main>
				</div>
			</NotefulsContext.Provider>
		);
	}
}

export default App;
