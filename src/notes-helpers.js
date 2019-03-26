export const getNotesForFolder = (notes = [], folderId) =>
	!folderId ? notes : notes.filter(note => note.folderId === folderId);

export const findNote = (notes = [], noteId) =>
	notes.filter(note => note.id === noteId);

export const findFolder = (folders = [], note) =>
	folders.find(folder => folder.id === note[0].folderId);

export const getDate = date => {
	const fixedDate = date
		.split("")
		.splice(-0, 10)
		.join("");
	return fixedDate;
};
