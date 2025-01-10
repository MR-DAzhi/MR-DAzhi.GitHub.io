function openWindow(id) {
  const windowElement = document.getElementById(id);
  windowElement.style.display = 'block';
}

function closeWindow(id) {
  const windowElement = document.getElementById(id);
  windowElement.style.display = 'none';
}

function toggleStartMenu() {
  const startMenu = document.getElementById('startMenu');
  if (startMenu.style.display === 'none') {
    startMenu.style.display = 'block';
  } else {
    startMenu.style.display = 'none';
  }
}
