const chalk = require('chalk')
const yargs = require('yargs');
const notes = require('./notes.js')


yargs.version('1.1.0')

yargs.command( {
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Body of the note",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command( {
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: "Remove note",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})


yargs.command( {
  command: 'list',
  describe: 'listing out all  note',
  handler: () => {
    console.log('listing the note...')
  }
})

yargs.command( {
  command: 'read',
  describe: 'Read a note',
  handler: () => {
    console.log('Reading the note...')
  }
})


yargs.parse()