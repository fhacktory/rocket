

export default {
  total: 0,
  current: 0,
  width: 300,
  init() {
    this.total = 1500;
    document.getElementById('init').style.display = 'none';
    document.getElementById('progress-bar-container').style.display = 'block';
    console.log(document.getElementById('progress-bar-container').style)
    const interval = setInterval(() => {
      this.current += 100;
      if (this.current <= this.total) {
        document.getElementById('progress-bar').style.width = this.getCurrentWidth();
      } else {
        document.getElementById('progress-bar-container').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'block';
        clearInterval(interval);
      }
    }, 1000)
  },
  getCurrentWidth() {
    return `${this.width * this.current / this.total}px`
  }
}