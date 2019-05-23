//dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';
//context
import NotefulsContext from '../NotefulsContext';
//css
import './NoteItem.css';
//helper functions
import {getDate} from '../notes-helpers';

export default withRouter(
  class NoteItem extends React.Component {
    static contextType = NotefulsContext;
    static defaultProps = {
      onDeleteNote: () => {},
      history: {
        push: () => {},
      },
    };

    deleteNoteRequest = e => {
      e.preventDefault();
      const noteId = this.props.id;
      fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
      })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e));
          return res.json();
        })
        .then(() => {
          this.context.deleteNote(noteId);
          // allow parent to perform extra behaviour
          this.props.onDeleteNote(noteId);
        })
        .catch(error => {
          console.error({error});
        });
    };

    editNoteRequest = e => {
      e.preventDefault();
      const noteId = this.props.id;
      console.log('editNoteRequest ran');
      this.props.history.push(`/update-note/${noteId}`);
    };
    render() {
      const {name, id, modified} = this.props;
      return (
        <li className="NoteItem" key={id}>
          <h3 className="NoteItem__title">{name}</h3>
          <button
            className="Note__delete"
            type="button"
            onClick={this.deleteNoteRequest}
          >
            remove
          </button>
          <button
            className="Note__delete"
            type="button"
            onClick={this.editNoteRequest}
          >
            edit
          </button>
          <p className=".Note__dates">
            Date modified on<time> {getDate(modified)}</time>
          </p>
        </li>
      );
    }
  }
);
