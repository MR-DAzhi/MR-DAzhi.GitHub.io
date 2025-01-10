function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function openWindow(title, content) {
    const popupWindow = document.getElementById('popupWindow');
    const popupTitle = document.getElementById('popupTitle');
    const popupBody = document.getElementById('popupBody');

    popupTitle.textContent = title;

    //  根据窗口标题设置不同的内容结构
    if (title === '我的电脑') {
        popupBody.innerHTML = `
            <div class="explorer-address-bar">
                <span>此电脑</span>
            </div>
            <div class="explorer-toolbar">
                <! -- 这里可以添加工具栏按钮 -->
            </div>
            <div class="explorer-content">
                <! --  “我的电脑”窗口打开时，内容区域为空白 -->
            </div>
        `;
    } else {
        popupBody.textContent = content; // 其他窗口保持原有内容
    }

    popupWindow.style.display = 'block';

    // 添加任务栏图标
    const taskbarIcons = document.getElementById('taskbar-icons');
    const taskbarIcon = document.createElement('img');
    taskbarIcon.alt = title;
    taskbarIcon.classList.add('taskbar-icon');
    taskbarIcon.onclick = () => {
        popupWindow.style.display = 'block';
    };

    if (title === '我的电脑') {
        taskbarIcon.src = 'assets/this_pc.png';
    } else if (title === '回收站') {
        taskbarIcon.src = 'assets/recycle_bin.png';
    } else if (title === '网络') {
        taskbarIcon.src = 'assets/network.png';
    } else if (title === '用户文件夹') {
        taskbarIcon.src = 'assets/user_folder.png';
    } else {
        taskbarIcon.src = 'assets/app_icon.png'; // 默认图标
    }

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

function refreshDesktop() {
    // 这里可以添加刷新的逻辑，例如重新加载数据等
    alert('桌面已刷新！'); // 简单的提示
}

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
