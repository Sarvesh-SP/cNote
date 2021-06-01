#!/usr/bin/env node

const program = require('commander');
const notes = require('./notes.js')


program.version('v1.3.0').description('Command line interface, which implements as notes manager.')

program
.command('add')
.requiredOption('-t, --title <type>', 'Title of the note')
.requiredOption('-b, --body <type>', 'Body of the note')
.description('You can add a new note')
.action(cmd => {
  notes.addNote(cmd.title, cmd.body)
});

program
.command('remove')
.requiredOption('-t, --title <type>', 'Title of the note')
.description('You can remove an existing note')
.action(cmd => {
  notes.removeNote(cmd.title)
});

program
.command('list')
.description('You can list out all the notes.')
.action(cmd => {
  notes.listNotes();
});

program
.command('read')
.requiredOption('-t, --title <type>', 'Title of the note')
.description('You can read a particular note')
.action(cmd => {
  notes.readNote(cmd.title)
});

program.parse(process.argv);