//dependencies
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
//config
import config from '../config';
//helper function
import {findFolder} from '../notes-helpers';
//context
import NotefulsContext from '../NotefulsContext';
//handle Errors
import ValidationError from '../errorboundary/ValidationError';
//css
import './AddNote.css';
class AddNote extends Component {
  state = {
    name: '',
    folder: '',
    nameValid: false,
    folderValid: false,
    formValid: false,
    validationMessages: {
      name: '',
      folder: '',
    },
  };
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  updateName(name) {
    this.setState({name}, () => {
      this.validateName(name);
    });
  }

  updateFolder(folder) {
    this.setState({folder}, () => {
      this.validateFolder(folder);
    });
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.folderValid,
    });
  }

  handleSubmit = e => {
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
    };
    //prettier-ignore
    fetch(config.API_ENDPOINT_NOTE, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(newNote)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note['folder_id']}`);
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
  validateFolder = fieldValue => {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    this.props.folders.forEach(folder => {
      if (folder.id === fieldValue) {
        fieldErrors.folder = '';
        hasError = false;
      }
    });
    if (hasError === true) {
      fieldErrors.folder = 'Must select a folder';
      hasError = true;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        folderValid: !hasError,
      },
      this.formValid
    );
  };
  render() {
    const folders = this.props.folders;
    console.log(folders);
    if (!folders || folders.length <= 0) {
      // Display a message or Show a Loading Gif here
      return <div>Loading...</div>;
    }
    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <form className="addnote-form" action="#" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input
              type="text"
              id="note-name-input"
              name="note-name"
              onChange={e => this.updateName(e.target.value)}
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea id="note-content-input" name="note-content" />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select
              id="note-folder-select"
              name="note-folder-id"
              onChange={e => this.updateFolder(e.target.value)}
            >
              <option value={null}>...</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {console.log(folder['folder_name'])}
                  {folder['folder_name']}
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
              Add note
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(AddNote);
