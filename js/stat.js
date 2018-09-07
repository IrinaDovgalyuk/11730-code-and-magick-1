'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

// отрисовка облака и тени
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(CLOUD_WIDTH + x, y);
  ctx.lineTo(CLOUD_WIDTH + x - 20, CLOUD_HEIGHT + y);
  ctx.lineTo(x + 20, CLOUD_HEIGHT + y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

// поиск максимального элемента в массиве
function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  // поиск максимального времени в массиве times
  var maxTime = getMaxElement(times);

  // передача параметров для отрисовки облака и тени
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_WIDTH / 2, 30);
  ctx.fillText('Список результатов:', CLOUD_WIDTH / 2, 50);

  // отрисовка гистограмм
  ctx.fillStyle = '#000';

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // генерация случайного числа для прозрачности цвета
      var opacity = Math.random().toFixed(2);
      ctx.fillStyle = 'rgba(20, 20, 128, ' + opacity + ')';
    }
    // отрицательное значение высоты - для отрисовки от нижней точки гистограммы вверх
    ctx.fillRect(CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, 25 * CLOUD_Y, BAR_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[i]), CLOUD_X + FONT_GAP + (FONT_GAP + BAR_WIDTH) * i, 90);
  }
}
