// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.username),
    datasets: [
      {
        label: 'Total Debit',
        data: data.map(item => item.total_debit),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    type: 'bar',
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Users by Total Debit',
      },
    },
    scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
        },
      },
    };

  return (
      <Bar data={chartData} options={options} />
  );
};

export default BarChart;