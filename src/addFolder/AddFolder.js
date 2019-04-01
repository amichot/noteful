//dependencies
import React, { Component } from "react";
import NotefulsContext from "../NotefulsContext";
//css
import "./AddFolder.css";

export default class AddFolder extends Component {
	static defaultProps = {
		history: {
			push: () => {}
		}
	};
	static contextType = NotefulsContext;

	handleSubmit = e => {
		e.preventDefault();
		const folder = {
			name: e.target["folder-name"].value
		};
		fetch("http://localhost:9090/folders", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(folder)
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
				return res.json();
			})
			.then(folder => {
				this.context.addFolder(folder);
				this.props.history.push(`/folder/${folder.id}`);
			})
			.catch(error => {
				console.error({ error });
			});
	};
	render() {
		return (
			<section className='AddFolder'>
				<h2>Create a folder</h2>
				<form
					className='addfolder-form'
					action='#'
					onSubmit={this.handleSubmit}>
					<div className='field'>
						<label htmlFor='folder-name-input'>Name</label>
						<input type='text' id='folder-name-input' name='folder-name' />
					</div>
					<div className='buttons'>
						<button type='submit'>Add folder</button>
					</div>
				</form>
			</section>
		);
	}
}
