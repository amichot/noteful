import React from 'react';
//components
//import { getDate } from "../notes-helpers";
//helperfunctions
import {findNote} from '../notes-helpers';
//context
import NotefulsContext from '../NotefulsContext';
//css
import './NoteMain.css';

export default class NoteMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = NotefulsContext;

  render() {
    const {notes = []} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId);
    
    return (
      <section>
        <ul className="noteMain" aria-live="polite">
          {note && (
            <li className="NoteItem" key={note.id}>
              <h3 className="NoteItem__title">
                {findNote(notes, noteId).name}
              </h3>
              <p className="NoteItem__date">
                Date modified on <time>{note.modified}</time>
              </p>
              <p>
                {' '}
                Content: <br />
                {note.content}
              </p>
            </li>
          )}
        </ul>
      </section>
    );
  }
}
