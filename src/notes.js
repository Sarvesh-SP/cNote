const chalk = require('chalk')
const fs = require('fs');
const now = require('dayjs');
const path = require('path')
//Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find(note => note.title == title)
  date = now()
  if (!duplicateNotes) {
      notes.push({
      title: title,
      body: body,
      date: date.$d
    })
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added.'))
  } else {
    console.log(chalk.red.inverse('Note title taken.'))
  }
}

//Remove the give notes based on the title
const removeNote = (title) => {
  
  const notes = loadNotes();
  const contains = notes.filter(note =>note.title == title
  )
  if (contains.length == 0) {
    console.log(chalk.red.inverse("No note found."))
  } else {
    const match = notes.filter(note =>note.title != title
    )
    saveNotes(match)
    console.log(chalk.green.inverse("Note removed"))
  }
}


const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(no => no.title == title);
  if (!note) {
    console.log(chalk.red.inverse("No note found?"))
  } else {
    console.log("   |                                        Date: ", chalk.cyan.inverse(note.date));
    console.log("   |->", chalk.cyan.inverse(note.body))
  }
}
//List the entire notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse("Your notes: "))
  notes.forEach((note, i) => {
    console.log(chalk.blue(`${i+1}:`, note.title))
    console.log("   |                                        Date: ", chalk.green(note.date));
    console.log("   |->", chalk.cyan.inverse(note.body))
  });
}
//Save notes to the JSON file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync(path.join(__dirname, '../Notes/notes.json'), dataJSON)
}

//Load notes from the JSON file
const loadNotes = () => {

  try {
    const buffer = fs.readFileSync(path.join(__dirname, '../Notes/notes.json'))
    const stringJSON = buffer.toString();
    const data = JSON.parse(stringJSON)
    return data;
  } catch (e) {
    return []
  }
  
}



module.exports = {

  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}