import React, { useRef, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Graph.module.css';
import GraphSvg from './GraphSvg';
import Canvas from './Canvas/Canvas';

const Graph = (props) => {
  const canone = 68;

  const pointsCanvasRef = useRef(null);
  const currentCanvasRef = useRef(null);

  const loadPrevPoints = (canvas, canvasCtx) => {
    const rNow = props.rCurrent;
    for (let entry of props.entries) {
      canvasCtx.fillStyle = entry.result ? 'green' : 'red';
      canvasCtx.beginPath();
      canvasCtx.arc(
        entry.x / rNow * canone + canvas.width / 2,
        - entry.y / rNow * canone + canvas.height / 2,
        2, 0, 2 * Math.PI);
      canvasCtx.fill();
    }
  }

  const clearCanvas = (canvas, canvasCtx) => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const drawCurrent = (canvas, canvasCtx) => {
    clearCanvas(canvas, canvasCtx);
    const x = props.xCurrent * canone / props.rCurrent + canvas.width / 2;
    const y = -(props.yCurrent / props.rCurrent * canone - canvas.height / 2);

    if (x > canvas.width || x < 0 ||
      y > canvas.height || y < 0) {
      return;
    }

    canvasCtx.setLineDash([2, 2]);
    canvasCtx.fillStyle = 'black';
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, canvas.width / 2);
    canvasCtx.lineTo(x, y);
    canvasCtx.moveTo(canvas.height / 2, y);
    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();
    canvasCtx.arc(x, y, 2, 0, 2 * Math.PI);
    canvasCtx.fill();
  }

  const handleClick = (canvasRef, event) => {
    const canvas = canvasRef.current;

    let canvasX = (event.nativeEvent.offsetX - canvas.width / 2) / canone * props.rCurrent;
    if (canvasX < props.xMin) {
      canvasX = props.xMin;
    } else if (canvasX > props.xMax) {
      canvasX = props.xMax;
    }

    let canvasY = (-event.nativeEvent.offsetY + canvas.height / 2) / canone * props.rCurrent;
    if (canvasY < props.yMin) {
      canvasY = props.yMin;
    } else if (canvasY > props.yMax) {
      canvasY = props.yMax;
    }

    props.selectX(canvasX.toString().substring(0, 8));
    props.changeY(canvasY.toString().substring(0, 8));
  }

  useEffect(() => {
    const pointsCanvas = pointsCanvasRef.current;
    const pointsCanvasCtx = pointsCanvas.getContext('2d');
    clearCanvas(pointsCanvas, pointsCanvasCtx);

    const currentCanvas = currentCanvasRef.current;
    const currentCanvasCtx = currentCanvas.getContext('2d');
    clearCanvas(currentCanvas, currentCanvasCtx);

    loadPrevPoints(pointsCanvas, pointsCanvasCtx);
    drawCurrent(currentCanvas, currentCanvasCtx);
  });

  return (
    <div styleName="graph-container">
      <GraphSvg rValue={props.rCurrent} />
      <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
      <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
    </div>
  );
}

export default CSSModules(Graph, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
