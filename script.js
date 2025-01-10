function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

function closeAllWindows() {
    document.getElementById('startMenu').style.display = 'none';
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

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

function handleIconClick(iconId) {
    console.log('Icon clicked:', iconId);
}
