const cube = document.getElementById('cube');
const faces = document.querySelectorAll('.face');
const colorPicker = document.getElementById('colorPicker');
const autoToggle = document.getElementById('autoToggle');
const colorBox = document.getElementById('colorBox');

/* ================= STATE ================= */
let rotateX = 0;
let rotateY = 0;
let autoRotate = true;

/* ================= AUTO ROTATION ================= */
function autoRotateLoop() {
  if (autoRotate) {
    rotateY += 0.3;
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  requestAnimationFrame(autoRotateLoop);
}
autoRotateLoop();

/* ================= COLOR CHANGE ================= */
colorPicker.addEventListener('input', () => {
  faces.forEach(face => {
    face.style.background = colorPicker.value;
  });
});

/* ================= TOGGLE AUTO ROTATE ================= */
autoToggle.addEventListener('change', () => {
  autoRotate = autoToggle.checked;
});

/* ================= MANUAL ROTATION ================= */
let isDraggingCube = false;
let lastX = 0;
let lastY = 0;

cube.addEventListener('mousedown', e => {
  if (autoRotate) return;
  isDraggingCube = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mousemove', e => {
  if (!isDraggingCube) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  rotateY += dx * 0.5;
  rotateX -= dy * 0.5;
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDraggingCube = false;
});

/* ================= TOUCH SUPPORT ================= */
cube.addEventListener('touchstart', e => {
  if (autoRotate) return;
  const touch = e.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
});

cube.addEventListener('touchmove', e => {
  if (autoRotate) return;
  e.preventDefault();
  const touch = e.touches[0];
  const dx = touch.clientX - lastX;
  const dy = touch.clientY - lastY;
  rotateY += dx * 0.5;
  rotateX -= dy * 0.5;
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  lastX = touch.clientX;
  lastY = touch.clientY;
}, { passive: false });

/* ================= DRAGGABLE UI ================= */
let dragUI = false;
let offsetX = 0;
let offsetY = 0;

colorBox.addEventListener('mousedown', e => {
  dragUI = true;
  offsetX = e.clientX - colorBox.offsetLeft;
  offsetY = e.clientY - colorBox.offsetTop;
});

document.addEventListener('mousemove', e => {
  if (!dragUI) return;
  colorBox.style.left = e.clientX - offsetX + 'px';
  colorBox.style.top = e.clientY - offsetY + 'px';
  colorBox.style.bottom = 'auto';
  colorBox.style.transform = 'none';
});

document.addEventListener('mouseup', () => {
  dragUI = false;
});
