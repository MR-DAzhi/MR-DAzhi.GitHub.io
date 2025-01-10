function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function closeAllWindows() {
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

//  处理桌面右键菜单的显示
document.getElementById('desktop').addEventListener('contextmenu', (e) => {
    e.preventDefault(); // 阻止浏览器默认的右键菜单
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = e.clientX + 'px'; // 设置右键菜单的水平位置
    contextMenu.style.top = e.clientY + 'px';   // 设置右键菜单的垂直位置
    contextMenu.style.display = 'block';       // 显示右键菜单
});

//  处理点击事件，用于隐藏右键菜单
document.addEventListener('click', (e) => {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu.style.display === 'block') {
        contextMenu.style.display = 'none';
    }
});

function arrangeIcons() {
    const icons = document.querySelectorAll('.icon');
    let top = 50;
    let left = 50;
    icons.forEach(icon => {
        icon.style.top = top + 'px';
        icon.style.left = left + 'px';
        left += 100;
        if (left > window.innerWidth - 100) {
            left = 50;
            top += 100;
        }
    });
}

// 实现图标拖动
let draggedIcon = null;

document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('dragstart', (e) => {
        draggedIcon = e.target;
        icon.classList.add('dragging');
    });

    icon.addEventListener('dragend', (e) => {
        draggedIcon.classList.remove('dragging');
        draggedIcon = null;
    });
});

document.getElementById('desktop').addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.getElementById('desktop').addEventListener('drop', (e) => {
    if (draggedIcon) {
        draggedIcon.style.left = e.clientX - draggedIcon.offsetWidth / 2 + 'px';
        draggedIcon.style.top = e.clientY - draggedIcon.offsetHeight / 2 + 'px';
    }
});

function openWindow(iconId) {  {{ edit_2 }}
    const popupWindow = document.getElementById('popupWindow');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');
    const taskbarIcons = document.getElementById('taskbar-icons');

    let title = '';
    let content = '';

    switch (iconId) {
        case 'mycomputer':
            title = '我的电脑';
            content = '<p>这里是我的电脑的内容。</p>';
            break;
        case 'recyclebin':
            title = '回收站';
            content = '<p>这里是回收站的内容。</p>';
            break;
        case 'network':
            title = '网络';
            content = '<p>这里是网络的内容。</p>';
            break;
        case 'userfolder':
            title = '用户文件夹';
            content = '<p>这里是用户文件夹的内容。</p>';
            break;
    }

    popupTitle.textContent = title;
    popupBody.innerHTML = content;
    popupWindow.style.display = 'block';

    // 添加任务栏图标
    const taskbarIcon = document.createElement('img');
    taskbarIcon.src = document.querySelector(`.icon[data-id="${iconId}"] img`).src;
    taskbarIcon.alt = title;
    taskbarIcon.classList.add('taskbar-icon');
    taskbarIcon.onclick = () => {
        popupWindow.style.display = 'block';
    };
    taskbarIcons.appendChild(taskbarIcon);
}

function closeWindow() {  {{ edit_2 }}
    const popupWindow = document.getElementById('popupWindow');
    popupWindow.style.display = 'none';
    const taskbarIcons = document.getElementById('taskbar-icons');
    const iconSrc = document.querySelector('#popupTitle').textContent;
    const taskbarIcon = taskbarIcons.querySelector(`img[alt="${iconSrc}"]`);
    if (taskbarIcon) {
        taskbarIcons.removeChild(taskbarIcon);
    }
}

function handleIconClick(iconId) {  {{ edit_2 }}
    openWindow(iconId);
}

function openSelfIntroduction() {
    const popupWindow = document.getElementById('popupWindow');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');

    popupTitle.textContent = '关于 MR-DAzhi';
    popupBody.innerHTML = `
        <p>你好！我是 MR-DAzhi，一个对编程充满热情的开发者。</p>
        <p>目前正在学习前端开发技术，努力构建有趣且实用的 Web 应用。</p>
        <p>欢迎来到我的个人桌面！</p>
    `;
    popupWindow.style.display = 'block';
}
