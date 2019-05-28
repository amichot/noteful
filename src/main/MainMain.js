//dependencies
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//components
import NoteItem from './NoteItem';
//helperfunctions
import {getNotesForFolder} from '../notes-helpers';
//context
import NotefulsContext from '../NotefulsContext';
//css
import './MainMain.css';

class MainMain extends Component {
  static contextType = NotefulsContext;

  static defaultProps = {
    match: {
      params: {},
    },
    notes: [],
  };

  render() {
    const {folderId} = this.props.match.params;
    const {notes} = this.context;
    let getNotes = [];
    if (!notes || notes.length <= 0) {
      // Display a message or Show a Loading Gif here
      return <div>Loading...</div>;
    } else {
      getNotes = getNotesForFolder(notes, folderId);
    }

    return (
      <section>
        <ul className="notesList" aria-live="polite">
          {getNotes.map(note => (
            <NoteItem key={note.id} {...note} />
          ))}
          <Link to="/add-Note" type="button" className="add-Note-button">
            Add Note
          </Link>
        </ul>
      </section>
    );
  }
}

export default MainMain;
