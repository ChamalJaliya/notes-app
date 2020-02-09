// Loading NPM Modules
const chalk = require("chalk");
const yargs = require("yargs");

// Loading Custom Modules
const notes = require("./notes");
// Loading Core Modules

// const command = process.argv[2];

// Create add command with the help of Yargs
yargs.command({
  command: "add",
  describe: "Add a new Note",
  // Builder :- object where we define all the options of the command
  builder: {
    title: {
      describe: "Note Title",
      //required option
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    // Calling addNote from note.js external module
    notes.addNote(argv.title, argv.body);
    // console.log("Title : " +argv.title);
  }
});
// Create Remove Command
yargs.command({
  command: "remove",
  describe: "Remove a Note",
  builder: {
    title: {
      describe: "Note Title",
      //required option
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});
// Create Read Command
yargs.command({
  command: "read",
  describe: "Read a Note",
  builder: {
    title: {
      describe: "Note Title",
      //required option
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});
// Create List Command
yargs.command({
  command: "list",
  describe: "List a Note",
  handler() {
    notes.listNotes();
  }
});

// console.log("yargs ", yargs.argv); -> This line can omitted to see output by,
yargs.parse();
