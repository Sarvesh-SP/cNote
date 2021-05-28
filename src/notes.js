const chalk = require('chalk')
const fs = require('fs');

//Add Notes
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find(note => note.title == title)

  if (!duplicateNotes) {
    
      notes.push({
      title: title,
      body: body
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
    console.log("   |");
    console.log("   |->", chalk.cyan.inverse(note.body))
  }
}
//List the entire notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.inverse("Your notes: "))
  notes.forEach((element, i) => {
    console.log(chalk.blue.inverse(`${i+1}:`, element.title))
    console.log("   |");
    console.log("   |->", chalk.cyan.inverse(element.body))
  });
}
//Save notes to the JSON file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('../Notes/notes.json', dataJSON)
}

//Load notes from the JSON file
const loadNotes = () => {

  try {
    const buffer = fs.readFileSync('../Notes/notes.json')
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
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}