const fs = require('fs');

const addNote = (title, body) => {
  const notes = loadNotes();
  notes.push({
    title: title,
    body: body
  })
  saveNotes(notes);
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

  try {
    const buffer = fs.readFileSync('notes.json')
    const sJson = buffer.toString();
    const data = JSON.parse(sJson)
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
  addNote: addNote
}