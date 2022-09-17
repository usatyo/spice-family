import { Line, Bar } from 'react-chartjs-2'
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const MyChart = () => {
  /** グラフデータ */
  const graphData = {
    labels: [
      // 軸ラベル
      // 各ラベルを配列にすることで軸ラベルが改行されて表示される
      ['2019年', '1月'],
      ['2019年', '2月'],
      ['2019年', '3月'],
      ['2019年', '4月'],
      ['2019年', '5月'],
      ['2019年', '6月'],
      ['2019年', '7月'],
      ['2019年', '8月'],
      ['2019年', '9月'],
      ['2019年', '10月'],
      ['2019年', '11月'],
      ['2019年', '12月'],
    ],
    datasets: [
      // 表示するデータセット
      {
        data: [5.6, 7.2, 10.6, 13.6, 20, 21.8, 24.1, 28.4, 25.1, 19.4, 13.1, 8.5],
        backgroundColor: 'rgba(30, 144, 255, 1)',
        label: 'レート',
        maintainAspectRatio: false
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
            labelString: '2019年',
          },
        },
      ],
      yAxes: [
        // y軸オプション
        {
          scaleLabel: {
            // y軸ラベルオプション
            display: true,
            labelString: '合計降水量(mm)',
          },
          ticks: {
            // y軸メモリオプション
            beginAtZero: true,
            callback: function (value, index, values) {
              return `${value}(mm)`;
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

