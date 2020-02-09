const fs = require("fs");
const chalk = require("chalk");

// Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  // Not Allowing Duplicates
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  //debugger
  // To use it type node inspect app.js add --title....
  //Now open chrome inspect -> chrome//inspect
  
  // if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.bold("New Note Added !"));
  } else {
    console.log(chalk.red.bold(" Title '" + title + "' already exists !"));
  }
};

// Remove Notes
const removeNote = title => {
  const notes = loadNotes();
  // Search for the title in the json
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse.bold("Note " + title + " Removed !"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse.bold("Note " + title + " Doesn't Exists !"));
  }
};
// List Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your Notes"));

  notes.forEach(note => {
    console.log(note.title);
  });
};

// Read Note
const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.yellow.inverse(note.title));
    console.log(chalk.blue.bold(note.body));
  } else {
    console.log(chalk.red.bold(" Title '" + title + "' Note Not Found !"));
  }
};

// Loading Notes to the Add Note Prevent recreation and duplication
// Create file if doesn't exists else modify
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
// Save Notes
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// In order to use functions or data in this module
// in external file we have to export it
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
