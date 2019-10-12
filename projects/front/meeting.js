export default {
  total: 0,
  current: 0,
  width: 300,
  join(name, salary) {
    axios.post('/meeting/join', {
      name,
      salary
    }).then(() => this.init());
  },
  init() {
    const socket = io();
    socket.on('get meeting price', (price) => {
      document.getElementById('current-price').innerText = price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
    }),
    this.total = 180;
    document.getElementById('init').style.display = 'none';
    document.getElementById('progress-screen').style.display = 'block';
    const interval = setInterval(() => {
      this.current += 1;
      if (this.current <= this.total) {
        document.getElementById('progress-bar').style.width = this.getCurrentWidth();
      } else {
        document.getElementById('progress-screen').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'block';
        clearInterval(interval);
      }
    }, 1000)
  },
  getCurrentWidth() {
    return `${this.width * this.current / this.total}px`
  }
}