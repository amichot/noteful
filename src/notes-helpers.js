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
