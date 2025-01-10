function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function closeAllWindows() {
    document.getElementById('startMenu').style.display = 'none';
    const taskbarIcons = document.getElementById('taskbar-icons');
    taskbarIcons.innerHTML = '';
    const popupWindow = document.getElementById('popupWindow');
    popupWindow.style.display = 'none';
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
    const mrdazhiMenu = document.getElementById('mrdazhi-menu');
    if (mrdazhiMenu.style.display === 'block') {
        mrdazhiMenu.style.display = 'none';
    }
});

function arrangeIcons() {
    const icons = document.querySelectorAll('.icon');
    let top = 50;
    let left = 50;
    let row = 0;
    let col = 0;
    const iconWidth = 100;
    const iconHeight = 100;
    const desktopWidth = document.getElementById('desktop').offsetWidth;
    const maxCols = Math.floor((desktopWidth - 50) / iconWidth);

    icons.forEach(icon => {
        icon.style.top = top + 'px';
        icon.style.left = left + 'px';
        col++;
        left += iconWidth;
        if (col >= maxCols) {
            col = 0;
            left = 50;
            row++;
            top += iconHeight;
        }
    });
}

function refreshDesktop() {
    window.location.reload();
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
    e.preventDefault();
    if (draggedIcon) {
        const x = e.clientX - document.getElementById('desktop').offsetLeft - draggedIcon.offsetWidth / 2;
        const y = e.clientY - document.getElementById('desktop').offsetTop - draggedIcon.offsetHeight / 2;
        draggedIcon.style.left = x + 'px';
        draggedIcon.style.top = y + 'px';
    }
});

function openWindow(iconId) {
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
        case 'explorer':
            title = '文件资源管理器';
            content = '<p>这里是文件资源管理器的内容。</p>';
            break;
        case 'settings':
            title = '设置';
            content = '<p>这里是设置的内容。</p>';
            break;
        case 'controlpanel':
            title = '控制面板';
            content = '<p>这里是控制面板的内容。</p>';
            break;
    }

    popupTitle.textContent = title;
    popupBody.innerHTML = content;
    popupWindow.style.display = 'block';

    // 添加任务栏图标
    const taskbarIcon = document.createElement('img');
    if (document.querySelector(`.icon[data-id="${iconId}"] img`)) {
        taskbarIcon.src = document.querySelector(`.icon[data-id="${iconId}"] img`).src;
    } else {
        taskbarIcon.src = 'assets/app_icon.png'; // 使用默认图标
    }
    taskbarIcon.alt = title;
    taskbarIcon.classList.add('taskbar-icon');
    taskbarIcon.onclick = () => {
        popupWindow.style.display = popupWindow.style.display === 'none' ? 'block' : 'none';
    };
    
    // 检查任务栏是否已存在相同图标
    const existingIcon = taskbarIcons.querySelector(`img[alt="${title}"]`);
    if (!existingIcon) {
        taskbarIcons.appendChild(taskbarIcon);
    }
}

function closeWindow() {
    const popupWindow = document.getElementById('popupWindow');
    popupWindow.style.display = 'none';
    const taskbarIcons = document.getElementById('taskbar-icons');
    const iconSrc = document.querySelector('#popupTitle').textContent;
    const taskbarIcon = taskbarIcons.querySelector(`img[alt="${iconSrc}"]`);
    if (taskbarIcon) {
        taskbarIcons.removeChild(taskbarIcon);
    }
}

function handleIconClick(iconId) {
    openWindow(iconId);
}

function openSelfIntroduction() {
    return `
        <p>你好！我是 MR-DAzhi，一个对编程充满热情的开发者。</p>
        <p>目前正在学习前端开发技术，努力构建有趣且实用的 Web 应用。</p>
        <p>欢迎来到我的个人桌面！</p>
    `;
}

function openSelfIntroductionFromMenu() {
    const popupWindow = document.getElementById('popupWindow');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');

    popupTitle.textContent = '关于 MR-DAzhi';
    popupBody.innerHTML = openSelfIntroduction();
    popupWindow.style.display = 'block';
}

// 为开始菜单项添加点击事件处理程序
document.querySelector('#startMenu ul li[data-id="explorer"]').addEventListener('click', () => {
    openWindow('explorer');
});

document.querySelector('#startMenu ul li[data-id="settings"]').addEventListener('click', () => {
    openWindow('settings');
});

document.querySelector('#startMenu ul li[data-id="controlpanel"]').addEventListener('click', () => {
    openWindow('controlpanel');
});

// 为 MR-DAzhi 添加左键点击事件处理程序
document.getElementById('startMenuHeader').addEventListener('click', (e) => {
    e.stopPropagation();
    openSelfIntroductionFromMenu();
});
