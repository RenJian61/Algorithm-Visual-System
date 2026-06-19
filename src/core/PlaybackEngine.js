export class PlaybackEngine {
  constructor(intervalMs = 800) {
    this.steps = []
    this.currentIndex = 0
    this.timer = null
    this.intervalMs = intervalMs
    this.onStepChange = null
    this.onStatusChange = null
    this.status = 'idle'
  }

  loadSteps(steps) {
    this.pause()
    this.steps = steps || []
    this.currentIndex = 0
    this.status = this.steps.length > 0 ? 'ready' : 'idle'
    this._notify()
    return this.getCurrentStep()
  }

  getCurrentStep() {
    if (!this.steps.length) return null
    return this.steps[this.currentIndex] ?? null
  }

  stepForward() {
    if (!this.steps.length) return null
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++
    } else {
      this.status = 'completed'
      this._notifyStatus()
    }
    this._notify()
    return this.getCurrentStep()
  }

  stepBackward() {
    if (!this.steps.length) return null
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.status = 'ready'
      this._notifyStatus()
    }
    this._notify()
    return this.getCurrentStep()
  }

  play() {
    if (!this.steps.length) return
    if (this.currentIndex >= this.steps.length - 1) {
      this.currentIndex = 0
    }
    this.status = 'playing'
    this._notifyStatus()
    this.pause()
    this.timer = setInterval(() => {
      if (this.currentIndex >= this.steps.length - 1) {
        this.pause()
        this.status = 'completed'
        this._notifyStatus()
        return
      }
      this.stepForward()
    }, this.intervalMs)
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.status === 'playing') {
      this.status = 'paused'
      this._notifyStatus()
    }
  }

  reset() {
    this.pause()
    this.currentIndex = 0
    this.status = this.steps.length > 0 ? 'ready' : 'idle'
    this._notify()
  }

  isAtEnd() {
    return this.steps.length > 0 && this.currentIndex >= this.steps.length - 1
  }

  exportLog() {
    return this.steps
      .map((s, i) => `[${i}] (${s.type}) ${s.description}`)
      .join('\n')
  }

  setOnStepChange(fn) {
    this.onStepChange = fn
  }

  setOnStatusChange(fn) {
    this.onStatusChange = fn
  }

  _notify() {
    this.onStepChange?.(this.getCurrentStep(), this.currentIndex, this.steps.length)
  }

  _notifyStatus() {
    this.onStatusChange?.(this.status)
  }
}
