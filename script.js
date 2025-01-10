// ...之前的 JavaScript 代码...

document.getElementById('desktop').addEventListener('contextmenu', (e) => {  {{ edit_3 }}
    e.preventDefault();
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = e.clientX + 'px';
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.display = 'block';
});

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
