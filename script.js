// 获取开始按钮和菜单
const startButton = document.querySelector('.start-button');
const startMenu = document.querySelector('#startMenu');

// 点击开始按钮，切换菜单显示状态
startButton.addEventListener('click', () => {
  const isMenuVisible = startMenu.style.display === 'block';
  startMenu.style.display = isMenuVisible ? 'none' : 'block';
});

// 点击其他地方关闭菜单
document.addEventListener('click', (event) => {
  if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
    startMenu.style.display = 'none';
  }
});
