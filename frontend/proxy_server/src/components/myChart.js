import { Line } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js"
import { response } from '../utils/api'

Chart.register(...registerables)

const MyChart = () => {

  let begin = new Date()
  let end = new Date();

  begin.setDate(begin.getDate() - 30);
  begin.setHours(0, 0, 0, 0);

  const labels = []

  for (var d = begin; d <= end; d.setDate(d.getDate() + 1)) {
    var formatedDate = (d.getMonth() + 1) + '/' + d.getDate();
    labels.push(formatedDate);
  }

  const data = Object.values(response)

    const graphData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: 'rgba(30, 144, 255, 1)',
          label: '直近1か月のレート',
          pointRadius: 5,
          borderWidth: 5,
        },
      ],
    };

  const graphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '日付',
          },
          type: 'time',
          time: {
            unit: 'day',
          },
          ticks: {
            min: begin,
            max: end
          }
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'レート',
          },
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return value;
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={graphData} options={graphOption} />
    </div>
  );
}

export default MyChart

