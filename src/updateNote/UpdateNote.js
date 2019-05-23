//dependencies
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
//helper functions
import {findFolder} from '../notes-helpers';
//handle Errors
import ValidationError from '../errorboundary/ValidationError';
//css
import '../addNote/AddNote.css';
class UpdateNote extends Component {
  state = {
    id: '',
    name: '',
    folder_id: '',
    content: '',
    nameValid: false,
    formValid: false,
    validationMessages: {
      name: '',
    },
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    folder_id: PropTypes.number,
    content: PropTypes.string,
  };

  updateName(name) {
    this.setState({name}, () => {
      this.validateName(name);
    });
  }

  updateContent(content) {
    this.setState({content});
  }

  updateFolder(folder_id) {
    this.setState({folder_id});
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid,
    });
  }

  componentDidMount() {
    const {noteId} = this.props.match.params;
    fetch('http://localhost:8000/api/note/' + noteId, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));

        return res.json();
      })
      .then(responseData => {
        this.updateName(responseData.name);
        this.updateFolder(responseData.folder_id);
        this.updateContent(responseData.content);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    };
    const {noteId} = this.props.match.params;
    fetch('https://localhost:8000/api/note/' + noteId, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        console.log(res.json());
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        console.log(res.json());
        return res.json();
      })
      .then(note => {
        this.context.updateNote(note);
      })
      .catch(error => {
        console.error({error});
      });
  };

  validateName = fieldValue => {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      fieldErrors.name = '';
      hasError = false;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError,
      },
      this.formValid
    );
  };

  render() {
    const {folders} = setTimeout(() => this.props.folders, 3000);
    console.log(folders);
    const getFolder = setTimeout(
      () => findFolder(folders, this.state.folder_id),
      4000
    );
    console.log(folders);
    const {name} = this.state;
    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <form className="editnote-form" action="#" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input
              type="text"
              id="note-name-input"
              name="note-name"
              defaultValue={name}
              onChange={e => this.updateName(e.target.value)}
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea
              id="note-content-input"
              name="note-content"
              value={this.state.content}
              onChange={e => this.updateContent(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select
              id="note-folder-select"
              name="note-folder-id"
              selected={getFolder.name}
              onChange={e => this.updateFolder(e.target.value)}
            >
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <ValidationError
              hasError={!this.state.folderValid}
              message={this.state.validationMessages.folder}
            />
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="registration__button"
              disabled={!this.state.formValid}
            >
              Add edited note
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(UpdateNote);
