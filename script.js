function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openWindow(title, content) {
  const popup = document.getElementById('popupWindow');
  document.getElementById('popupTitle').innerText = title;
  document.getElementById('popupBody').innerText = content;
  popup.style.display = 'block';

  // 隐藏开始菜单
  const menu = document.getElementById('startMenu');
  menu.style.display = 'none';
}

function closeWindow() {
  const popup = document.getElementById('popupWindow');
  popup.style.display = 'none';
}

function closeAllWindows() {
  closeWindow();
}
