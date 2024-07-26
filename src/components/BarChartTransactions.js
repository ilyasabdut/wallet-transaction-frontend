import { Bar } from 'react-chartjs-2';

const BarChartTransactions = ({ data }) => {
  const { debit, credit } = data;

  const labels = ['Transfer'];
  const debitData = [-Math.abs(debit.total_debit)];
  const creditData = [credit.total_credit];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Debit',
        data: debitData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Credit',
        data: creditData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, 
        min: Math.min(-Math.abs(debit.total_debit), 0),
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Transactions',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartTransactions;