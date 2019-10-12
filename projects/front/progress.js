

export default {
  total: 0,
  current: 0,
  width: 300,
  init() {
    this.total = 1500
    const interval = setInterval(() => {
      this.current += 100
      if (this.current <= this.total) {
        document.getElementsByClassName('progress-bar')[0].style.width = this.getCurrentWidth()
      } else {
        document.getElementsByClassName('progress-bar-container')[0].innerHTML = 'Game over';
        clearInterval(interval);
      }
    }, 1000)
  },
  getCurrentWidth() {
    return `${this.width * this.current / this.total}px`
  }
}