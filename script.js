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

const launchpadButton = document.querySelector('.dock-item:first-child');
const launchpad = document.querySelector('.launchpad');

launchpadButton.addEventListener('click', () => {
    launchpad.style.display = launchpad.style.display === 'none' ? 'block' : 'none';
});
