export const getNotesForFolder = (notes = [], folderId) =>
	!folderId ? notes : notes.filter(note => note.folderId === folderId);

export const findNote = (notes = [], noteId) =>
	notes.find(note => note.id === noteId);

export const findFolder = (folders = [], folderId) =>
	folders.find(folder => folder.id === folderId);

export const getDate = date => {
	const fixedDate = date
		.split("")
		.splice(-0, 10)
		.join("");
	return fixedDate;
};

const validateName = (name, validation) => {
	// not empty
	const isEmpty = !name.trim().length > 0;
	if (isEmpty) {
		const error = {
			propertyName: "name",
			errorMessage: "Name cannot be empty."
		};
		validation.errors.push(error);
		validation.isValid = false;
	}
};

export const newNoteValidator = newNote => {
	const validation = {
		isValid: true,
		errors: []
	};
	for (const note in newNote) {
		switch (note) {
			case "name":
				validateName(newNote[note], validation);
				break;
			// case "content":
			// 	validateContent(newNote[note], validation);
			// 	break;
			// case "folderId":
			// 	validateFolderId(newNote[note], validation);
			// 	break;
			default:
				break;
		}
	}
	return validation;
};
