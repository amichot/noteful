//dependencies
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import p from 'prop-types';
//config
import config from '../config';
//handle Errors
import ValidationError from '../errorboundary/ValidationError';
//css
import './AddFolder.css';

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: '',
      nameValid: false,
      formValid: false,
      validationMessages: {
        name: ''
      }
    };
  }

  updateName(name) {
    this.setState({name}, () => {
      this.validateName(name);
    });
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  static defaultProps = {
    history: p.shape({
      push: p.func
    }).isRequired
  };

  handleSubmit = (e, callback) => {
    this.setState({error: null});
    const folder = {
      folder_name: e.target['folder-name'].value
    };
    //prettier-ignore
    fetch(config.API_ENDPOINT_FOLDER, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(folder => {
        this.props.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch(error => {
        console.error({error})
        this.setState({error})
      });
  };

  validateName = fieldValue => {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    }
    this.props.folders.forEach(folder => {
      if (folder.name === fieldValue) {
        fieldErrors.name = 'There is already a folder with this name';
        hasError = true;
      }
    });

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  };

  render() {
    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <form
          className="addfolder-form"
          action="#"
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label htmlFor="folder-name-input">Name</label>
            <input
              type="text"
              id="folder-name-input"
              name="folder-name"
              onChange={e => this.updateName(e.target.value)}
              required
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>
          <div className="buttons">
            <button type="submit" disabled={!this.state.formValid}>
              Add folder
            </button>
          </div>
        </form>
      </section>
    );
  }
}
AddFolder.propTypes = {
  folders: p.arrayOf(
    p.shape({
      id: p.number.isRequired,
      name: p.string.isRequired
    })
  )
};
export default withRouter(AddFolder);
