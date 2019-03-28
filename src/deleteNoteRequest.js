import React from "react";

function deleteNoteRequest(noteId, callback) {
	fetch("http://localhost:9090/notes" + `/${noteId}`, {
		method: "DELETE",
		headers: { "content-type": "application/json" }
	})
		.then(res => {
			if (!res.ok) {
				return res.json().then(error => {
					throw error;
				});
			}
			return res.json();
		})
		.then(data => {
			callback(noteId);
		})
		.catch(error => {
			console.error(error);
		});
}
