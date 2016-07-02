import SubCommand from '../models/sub-command'
import Blueprint from '../models/blueprint'
import GenerateFromBluePrint from '../tasks/generate-from-blueprint'
import chalk from 'chalk'

export default class Generate extends SubCommand {
  constructor() {
    super()
    this.generateTask = new GenerateFromBluePrint(this.environment)
  }

  printUserHelp() {
  }

  run(blueprintName, cliArgs) {
    if (cliArgs.debug) this.ui.setWriteLevel('DEBUG')

    this.generateTask.run(blueprintName, cliArgs)
  }
}
