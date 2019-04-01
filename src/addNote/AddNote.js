//dependencies
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import p from "prop-types";
//handle Errors
import ValidationError from "../errorboundary/ValidationError";
//css
import "./AddNote.css";
class AddNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			folder: "",
			nameValid: false,
			folderValid: false,
			formValid: false,
			validationMessages: {
				name: "",
				folder: ""
			}
		};
	}

	updateName(name) {
		this.setState({ name }, () => {
			this.validateName(name);
		});
	}

	updateFolder(folder) {
		this.setState({ folder }, () => {
			this.validateFolder(folder);
		});
	}

	formValid() {
		this.setState({
			formValid: this.state.nameValid && this.state.folderValid
		});
	}

	static defaultProps = {
		history: {
			push: () => {}
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		const newNote = {
			name: e.target["note-name"].value,
			content: e.target["note-content"].value,
			folderId: e.target["note-folder-id"].value,
			modified: new Date()
		};

		fetch("http://localhost:9090/notes", {
			method: "POST",
			headers: {
				"content-type": "application/json"
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
				this.props.addNote(note);
				this.props.history.push(`/folder/${note.folderId}`);
			})
			.catch(error => {
				console.error({ error });
			});
	};

	validateName = fieldValue => {
		const fieldErrors = { ...this.state.validationMessages };
		let hasError = false;

		fieldValue = fieldValue.trim();
		if (fieldValue.length === 0) {
			fieldErrors.name = "Name is required";
			hasError = true;
		} else {
			fieldErrors.name = "";
			hasError = false;
		}

		this.setState(
			{
				validationMessages: fieldErrors,
				nameValid: !hasError
			},
			this.formValid
		);
	};
	validateFolder = fieldValue => {
		const fieldErrors = { ...this.state.validationMessages };
		let hasError = false;

		fieldValue = fieldValue.trim();
		this.props.folders.forEach(folder => {
			if (folder.id === fieldValue) {
				fieldErrors.folder = "";
				hasError = false;
			}
		});
		if (hasError === true) {
			fieldErrors.folder = "Must select a folder";
			hasError = true;
		}

		this.setState(
			{
				validationMessages: fieldErrors,
				folderValid: !hasError
			},
			this.formValid
		);
	};
	render() {
		const folders = this.props.folders;
		return (
			<section className='AddNote'>
				<h2>Create a note</h2>
				<form className='addnote-form' action='#' onSubmit={this.handleSubmit}>
					<div className='field'>
						<label htmlFor='note-name-input'>Name</label>
						<input
							type='text'
							id='note-name-input'
							name='note-name'
							onChange={e => this.updateName(e.target.value)}
						/>
						<ValidationError
							hasError={!this.state.nameValid}
							message={this.state.validationMessages.name}
						/>
					</div>
					<div className='field'>
						<label htmlFor='note-content-input'>Content</label>
						<textarea id='note-content-input' name='note-content' />
					</div>
					<div className='field'>
						<label htmlFor='note-folder-select'>Folder</label>
						<select
							id='note-folder-select'
							name='note-folder-id'
							onChange={e => this.updateFolder(e.target.value)}>
							<option value={null}>...</option>
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
					<div className='buttons'>
						<button
							type='submit'
							className='registration__button'
							disabled={!this.state.formValid}>
							Add note
						</button>
					</div>
				</form>
			</section>
		);
	}
}

AddNote.propTypes = {
	folders: p.arrayOf(
		p.shape({
			id: p.string.isRequired,
			name: p.string.isRequired
		})
	)
};
export default withRouter(AddNote);
