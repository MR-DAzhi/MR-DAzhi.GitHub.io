function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function openWindow(title, content) {
    const popupWindow = document.getElementById('popupWindow');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');

    popupTitle.textContent = title;
    popupBody.textContent = content;
    popupWindow.style.display = 'block';

    // 添加任务栏图标
    const taskbarIcons = document.getElementById('taskbar-icons');
    const taskbarIcon = document.createElement('img');
    taskbarIcon.src = 'assets/app_icon.png';
    taskbarIcon.alt = title;
    taskbarIcon.classList.add('taskbar-icon');
    taskbarIcon.onclick = () => {
        popupWindow.style.display = 'block';
    };
    taskbarIcons.appendChild(taskbarIcon);
}

function closeWindow() {
    document.getElementById('popupWindow').style.display = 'none';
    // 移除任务栏图标
    const taskbarIcons = document.getElementById('taskbar-icons');
    const icons = taskbarIcons.querySelectorAll('.taskbar-icon');
    if (icons.length > 0) {
        taskbarIcons.removeChild(icons[icons.length - 1]);
    }
}

function closeAllWindows() {
    document.getElementById('popupWindow').style.display = 'none';
    document.getElementById('startMenu').style.display = 'none';
    const taskbarIcons = document.getElementById('taskbar-icons');
    taskbarIcons.innerHTML = '';
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

let isDragging = false;
let offsetX, offsetY;

document.getElementById('popupHeader').addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - document.getElementById('popupWindow').offsetLeft;
    offsetY = e.clientY - document.getElementById('popupWindow').offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const popupWindow = document.getElementById('popupWindow');
    popupWindow.style.left = (e.clientX - offsetX) + 'px';
    popupWindow.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
