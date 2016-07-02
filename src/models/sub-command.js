import ProjectSettings from './project-settings'
import UI from './ui'

export default class SubCommand {
  constructor(options = {}) {
    this.rawOptions = options
    this.settings = options.settings || new ProjectSettings()
    this.ui = options.ui || new UI()

    this.environment = {
      ui: this.ui,
      settings: this.settings,
    }
  }
}
