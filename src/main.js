import './output.css';
import CHART from './chart.js';

document.addEventListener('DOMContentLoaded', () => {
  CHART.renderChart(CHART.VOTOS, [
    { x: 'A', y: 10 },
    { x: 'B', y: 20 },
    { x: 'C', y: 30 }
  ]);
  CHART.renderChart(CHART.MESAS, [
    { x: 'A', y: 10 },
    { x: 'B', y: 20 },
    { x: 'C', y: 30 }
  ]);
});
