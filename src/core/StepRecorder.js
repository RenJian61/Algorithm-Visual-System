export class StepRecorder {
  constructor() {
    this.steps = []
    this._index = 0
  }

  record(type, description, state, highlight = null) {
    const step = {
      index: this._index++,
      type,
      description,
      state: JSON.parse(JSON.stringify(state)),
      highlight,
    }
    this.steps.push(step)
    return step
  }

  getSteps() {
    return this.steps
  }

  reset() {
    this.steps = []
    this._index = 0
  }
}
