import commander from 'commander'
import { version } from '../version'
import Generate from '../sub-commands/generate'
import minimist from 'minimist'

const subCommand = new Generate()

commander.on('--help', () => {
  subCommand.printUserHelp()
}

commander
  .version(version())
  .arguments('<blueprint> [entity name]')
  .option('-v, --verbose', 'Turn debug mode on')
  .description('generates code based off a blueprint')
  .action((bluprintName, entityName, command) => {
    const debug = command.verbose
    const rawArgs = command.rawArgs
    const options = minimist(rawArgs.slice(2))

    const cliArgs = {
      entity: {
        name: entityName,
        options,
        rawArgs
      },
      debug
    }
    subCommand.run(bluprintName, cliArgs)
  })
  .parse(process.argv)
