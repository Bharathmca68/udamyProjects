const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = function () {
  return "Your notes...";
};
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (duplicateNote) {
    console.log("Note title taken");
  } else {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("note added succesfully");
  }
};
const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log(element.title);
  });
};
const findNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((e) => e.title === title);
  console.log(chalk.inverse(note.title));
  console.log(note.body);
};
const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  saveNotes(newNotes);
  console.log("Not with title " + title + " has been deleted!");
};
const saveNotes = (notes) => {
  const datajson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", datajson);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const jsonData = dataBuffer.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
};

module.exports = { findNote, getNotes, addNote, removeNote, listNotes };
