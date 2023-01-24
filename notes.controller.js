const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Added!!!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((item) => item.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("the list of something"));
  notes.forEach((item) => {
    console.log(chalk.yellow(item.id), chalk.blue(item.title));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
