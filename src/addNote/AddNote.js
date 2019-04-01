import React, { Component } from "react";
import NotefulsContext from "../NotefulsContext";
import ValidationError from "../errorboundary/ValidationError";
import "./AddNote.css";

export default class AddNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			folderId: "",
			nameValid: false,
			folderIdValid: false,
			formValid: false,
			validationMessages: {
				name: "",
				folderId: ""
			}
		};
	}

	updateName(name) {
		this.setState({ name }, () => {
			this.validateName(name);
		});
	}

	updatefolderId(folderId) {
		this.setState({ folderId }, () => {
			this.validatefolderId(folderId);
		});
	}

	formValid() {
		this.setState({
			formValid: this.state.nameValid
		});
	}

	static defaultProps = {
		history: {
			push: () => {}
		}
	};
	static contextType = NotefulsContext;

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
				this.context.addNote(note);
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
	render() {
		const folders = this.context;
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
						<select id='note-folder-select' name='note-folder-id'>
							<option value={null}>...</option>
							{folders.map(folder => (
								<option key={folder.id} value={folder.id}>
									{folder.name}
								</option>
							))}
						</select>
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
