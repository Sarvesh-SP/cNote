const chalk = require('chalk')
const fs = require('fs');

//Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title == title
  });

  if (duplicateNotes.length == 0) {
    
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log('New note added.')
  } else {
    console.log('Note title taken.')
  }
}


const removeNote = (title) => {
  
  const notes = loadNotes();
  const contains = notes.filter(note => {
    return note.title == title
  })
  if (contains.length == 0) {
    console.log(chalk.bgRed.black("Title Does'nt Exist.."))
  } else {
    const match = notes.filter(note => {
      return note.title != title
    })
    saveNotes(match)
    console.log(chalk.bgGreen.black(`${title} Removed`))
  }
}
//Save notes to the JSON file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON)
}

//Load notes from the JSON file
const loadNotes = () => {

  try {
    const buffer = fs.readFileSync('notes.json')
    const stringJSON = buffer.toString();
    const data = JSON.parse(stringJSON)
    return data;
  } catch (e) {
    return []
  }
  
}


const getNotes = () => {
  return "Your Notes..."
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}