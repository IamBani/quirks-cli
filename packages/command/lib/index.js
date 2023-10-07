class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('Command instance must not be null')
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    cmd.hook('preAction', () => {
      this.preAction()
    })
    cmd.hook('postAction', () => {
      this.postAction()
    })
    if (this.options.length > 0) {
      this.options.forEach((item) => cmd.option(...item))
    }

    cmd.action((...opts) => {
      this.action(opts)
    })
  }
  get command() {
    throw new Error('command must be implemented')
  }
  get options() {
    return []
  }
  get description() {
    throw new Error('description must be implemented')
  }
  get action() {
    throw new Error('action must be implemented')
  }
  postAction() {}
  preAction() {}
}

export default Command
