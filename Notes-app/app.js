const chalk = require("chalk");
const notes = require("./notes.js");
const yargs = require("yargs");

const command = process.argv[2];

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "add a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "Note Delete",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    notes.removeNote(args.title);
  },
});

yargs.command({
  command: "list",
  describe: "list all notes",
  handler: () => {
    notes.listNotes();
  },
});
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: { describe: "find a note", demandOption: true, type: "string" },
  },
  handler: (args) => {
    notes.findNote(args.title);
  },
});

yargs.parse();
