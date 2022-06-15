/*
    IMPORTS
*/
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { isMobile, $ } from './utils.js';
const d = document;
/*
    CHARTS Y UTILIDADES
*/
const RENDER_CHARTS = {};
const COLORS = {
  defaultBlur: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ],
  default: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ],
  blueScale: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)']
};
const VOTOS = {
  chartId: 'votos',
  type: 'doughnut',
  labels: [],
  labelsPlugin: true,
  datasets: [
    {
      datalabels: {
        listeners: {
          click: function (e) {
            console.log(e.chart.boxes[0].legendItems[e.dataIndex].text);
          }
        }
      },
      label: 'My First Dataset',
      data: [],
      backgroundColor: COLORS.default,
      hoverOffset: 4
    }
  ]
  //   callback(data) {
  //     let otros = 0;
  //     let cantidadTotal = sumArray(data.map((obj) => obj.CANTIDAD));
  //     let dataset = this.datasets[0].data;
  //     for (const { LINEA, CANTIDAD } of data) {
  //         let percent = (CANTIDAD / cantidadTotal) * 100;
  //         if (percent < 10) {
  //             otros += percent;
  //             continue;
  //         }
  //         dataset.push(round(+percent, 0));
  //         this.labels.push(LINEA);
  //     }
  //     dataset.push(round(+otros, 0));
  //     this.labels.push("OTROS");
  //   }
};
const MESAS = {
  chartId: 'mesas',
  type: 'pie',
  labels: [],
  labelsPlugin: true,
  datasets: [
    {
      datalabels: {
        listeners: {
          click: function (e) {
            console.log(e.chart.boxes[0].legendItems[e.dataIndex].text);
          }
        }
      },
      label: 'My First Dataset',
      data: [],
      backgroundColor: COLORS.blueScale,
      hoverOffset: 4
    }
  ]
};
/*
    FUNCIONES
*/
const drawChart = (options) => {
  const { chartId, type, labels, datasets, title } = options;
  const ctx = d.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    plugins: options.labelsPlugin ? [ChartDataLabels] : null,
    type,
    data: {
      labels,
      datasets
    },
    options: {
      plugins: {
        subtitle: {
          display: true,
          text: title
        },
        datalabels: {
          color: 'white',
          textAlign: 'center',
          formatter: function (value, ctx) {
            var index = ctx.dataIndex;
            var label = ctx.chart.data.labels[index];
            return isMobile() ? `${value} %` : label + '\n' + value + ' %';
          },
          labels: {
            title: {
              font: {
                weight: 'bold',
                size: isMobile() ? 16 : 16
              }
            }
          }
        }
      },
      onClick: (e) => {
        // console.log(e, e.chart); //e.chart.boxes[0].legendItems
      }
    }
  });
  RENDER_CHARTS[chartId] = chart;
};

const renderChart = (chart, data) => {
  chart.labels.length = 0;
  chart.datasets[0].data = [];
  chart.callback
    ? chart.callback(data)
    : data.forEach((obj) => {
        Object.getOwnPropertyNames(obj).forEach((key, index) => {
          index % 2 === 0
            ? chart.labels.push(obj[key])
            : chart.datasets[0].data.push(obj[key]);
        });
      });
  RENDER_CHARTS[chart.chartId] ? RENDER_CHARTS[chart.chartId].update() : drawChart(chart);
  $(`.loader-${chart.chartId}`)?.remove();
};

export default {
  renderChart,
  VOTOS,
  MESAS
};
