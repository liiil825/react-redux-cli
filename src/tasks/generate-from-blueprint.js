import Task from '../models/task'
import Blueprint from '../models/blueprint'

export default class extends Task {
  constructor(environment) {
    super(environment)
  }

  run(blueprintName, cliArgs) {
    const mainBlueprint = this.lookupblueprint('blueprintName')
  }
}
