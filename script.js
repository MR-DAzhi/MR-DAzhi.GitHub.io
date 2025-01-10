// 加载动画
const loadingScreen = document.querySelector('.loading-screen');
const progressBar = document.querySelector('.progress');

let progress = 0;
const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
        clearInterval(interval);
        loadingScreen.style.display = 'none';
        document.querySelector('.desktop').style.display = 'flex'; // 直接显示桌面 {{ edit_1 }}
    }
}, 100);

// 时间更新
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

// 启动台
const launchpadButton = document.querySelector('.dock-item:first-child');
const launchpad = document.querySelector('.launchpad');

launchpadButton.addEventListener('click', () => {
    launchpad.style.display = launchpad.style.display === 'none' ? 'block' : 'none';
});
