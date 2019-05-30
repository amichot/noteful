//dependencies
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
//config
import config from './config';
//components
import MainMain from './main/MainMain';
import MainSidebar from './sidebar/MainSidebar';
import NoteSidebar from './sidebar/NoteSidebar';
import NoteMain from './main/NoteMain';
import AddFolder from './addFolder/AddFolder.js';
import AddNote from './addNote/AddNote';
import NoteError from './errorboundary/NoteError';
import UpdateNote from './updateNote/UpdateNote';
//Context
import NotefulsContext from './NotefulsContext';
//css
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
  };

  setFolder = folders => {
    this.setState({folders, error: null});
  };

  setNotes = notes => {
    this.setState({notes, error: null});
  };

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId),
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };
  //prettier-ignore
  componentDidMount() {
    console.log(config)
    fetch(config.API_ENDPOINT_FOLDER, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolder);
    
    fetch(config.API_ENDPOINT_NOTE, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNotes);
  }

  handleUpdateNote = updatedNote => {
    const newNotes = this.state.notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    this.setState({
      notes: newNotes,
    });
  };

  renderNavRoutes() {
    const notes = this.state.notes;
    const folders = this.state.folders;
    return (
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <MainSidebar folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}

        <Route path="/note/:noteId" component={NoteSidebar} />
        <Route path="/add-folder" component={NoteSidebar} />
        <Route path="/add-note" component={NoteSidebar} />
        <Route path="/update-note" component={NoteSidebar} />
      </div>
    );
  }

  renderMainRoutes() {
    return (
      <div>
        {['/', '/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={MainMain} />
        ))}

        <Route path="/note/:noteId" component={NoteMain} />
        <Route
          path="/add-folder"
          render={routeProps => {
            return (
              <AddFolder
                {...routeProps}
                folders={this.state.folders}
                addFolder={this.handleAddFolder}
              />
            );
          }}
        />
        <Route
          path="/add-note"
          render={routeProps => (
            <AddNote
              {...routeProps}
              addNote={this.handleAddNote}
              folders={this.state.folders}
            />
          )}
        />
        <Route
          path="/update-note/:noteId"
          render={routeProps => (
            <UpdateNote
              {...routeProps}
              updateNote={this.handleUpdateNote}
              folders={this.state.folders}
            />
          )}
        />
      </div>
    );
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      updateNote: this.handleUpdateNote,
    };

    return (
      <main className="App">
        <NotefulsContext.Provider value={contextValue}>
          <NoteError>
            <nav className="App__nav">{this.renderNavRoutes()}</nav>
          </NoteError>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <NoteError>
            <main className="App__main">{this.renderMainRoutes()}</main>
          </NoteError>
        </NotefulsContext.Provider>
      </main>
    );
  }
}

export default App;
