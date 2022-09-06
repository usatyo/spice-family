import { Line } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const MyChart = (props) => {

  const labels = [
    // 軸ラベル
    // 各ラベルを配列にすることで軸ラベルが改行されて表示される
    '2021 / 10',
    '2021 / 12',
    '2021 / 11',
    '2022 / 1',
    '2022 / 2',
    '2022 / 3',
    '2022 / 4',
    '2022 / 5',
    '2022 / 6',
    '2022 / 7',
    '2022 / 8',
    '2022 / 9',
  ]
  /** グラフデータ */
  const graphData = {
    labels: labels,
    datasets: [
      // 表示するデータセット
      {
        data: props.data,
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: '直近12か月のレート',
      },
    ],
  };

  /** グラフオプション */
  const graphOption = {
    scales: {
      xAxes: [
        // x軸オプション
        {
          scaleLabel: {
            // x軸ラベルオプション
            display: true,
            labelString: '2021年',
          },
        },
      ],
      yAxes: [
        // y軸オプション
        {
          scaleLabel: {
            // y軸ラベルオプション
            display: true,
            labelString: 'レート',
          },
          ticks: {
            // y軸メモリオプション
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
      {/* グラフコンポーネントの呼び出し */}
      <Line data={graphData} options={graphOption} />
    </div>
  );
}

export default MyChart

