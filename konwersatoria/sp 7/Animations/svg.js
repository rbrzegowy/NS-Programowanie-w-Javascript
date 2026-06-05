document.addEventListener('DOMContentLoaded', initSvgAnimation);

function initSvgAnimation() {
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const host = document.querySelector('#svg-demo-host');

  if (!host) {
    return;
  }

  const svgWidth = Math.max(host.clientWidth || 800, 800);
  const svgHeight = 320;

  const svgContainer = document.createElementNS(svgNamespace, 'svg');
  svgContainer.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  host.appendChild(svgContainer);

  const xCenter = svgWidth / 2;
  const yCenter = svgHeight / 2;
  const circle = svgAnimatedCircle(xCenter, yCenter, 26, '#000');
  svgContainer.appendChild(circle);

  for (let offset = 0; offset < 10; offset += 1) {
    const xOffset = offset * 120;
    const path = svgAnimatedPath(svgContainer, xOffset, 0, svgWidth - xOffset, svgHeight, '#000');
    const path2 = svgAnimatedPath(svgContainer, xOffset, svgHeight, svgWidth - xOffset, 0, '#000');
    animateColor(path, 'stroke');
    animateColor(path2, 'stroke');
  }

  function svgAnimatedCircle(x, y, radius, color) {
    const circleElement = document.createElementNS(svgNamespace, 'circle');
    circleElement.setAttribute('cx', x);
    circleElement.setAttribute('cy', y);
    circleElement.setAttribute('r', radius);
    circleElement.setAttribute('fill', color);
    animateColor(circleElement, 'fill');
    return circleElement;
  }

  function svgAnimatedPath(container, startX, startY, endX, endY, color) {
    const path = document.createElementNS(svgNamespace, 'path');
    const startCmd = `M${startX}, ${startY}`;
    let x1 = svgWidth / 2;
    let y1 = svgHeight / 2;
    let x2 = svgWidth / 2;
    let y2 = svgHeight / 2;
    let bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`;
    path.setAttribute('d', `${startCmd} ${bezierCmd}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', `${color}`);
    path.setAttribute('stroke-width', '2px');

    container.appendChild(path);

    let step = 2 + Math.random() * 5;
    const direction = Math.random() > 0.5 ? 1 : -1;
    setInterval(() => {
      step = -step;
    }, 3000);

    const animate = function animationLoopCb() {
      x1 += step * direction;
      y1 -= step * direction;
      x2 -= step * direction;
      y2 += step * direction;
      bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`;
      path.setAttribute('d', `${startCmd} ${bezierCmd}`);
      requestAnimationFrame(animationLoopCb);
    };

    animate();
    return path;
  }

  function animateColor(element, fillOrStroke) {
    let randomColor = Math.floor(Math.random() * 255);
    let colorR = randomColor;
    let colorG = randomColor;
    let colorB = randomColor;
    let stepR = 1;
    let stepG = 1;
    let stepB = 1;

    const animation = function animationLoopCb() {
      colorR = normalizeRGBValue(colorR + stepR);
      colorG = normalizeRGBValue(colorG + stepG);
      colorB = normalizeRGBValue(colorB + stepB);

      if (colorR >= 255 || colorR <= 0) {
        stepR = -stepR;
      }
      if (colorG >= 255 || colorG <= 0) {
        stepG = -stepG;
      }
      if (colorB >= 255 || colorB <= 0) {
        stepB = -stepB;
      }

      element.setAttribute(fillOrStroke, `rgb(${colorR},${colorG},${colorB})`);
      requestAnimationFrame(animationLoopCb);
    };

    animation();
  }

  function normalizeRGBValue(val) {
    return Math.max(0, Math.min(255, val));
  }
}