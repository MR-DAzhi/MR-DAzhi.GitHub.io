function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
updateTime();

const startButton = document.querySelector('.start-button');
const startMenu = document.querySelector('.start-menu');

startButton.addEventListener('click', () => {
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
});
