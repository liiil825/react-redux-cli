import commander from 'commander'
import { version } from '../version'

const program = commander

program
  .version(version())

program
  .command('init', 'initialize a .reduxrc file for project details')

program
  .command('new', 'creates a new react redux roject')

program
  .command('generate', 'generates new code from blueprints')
  .command('g', 'alias for generate')

program.parse(process.argv)
