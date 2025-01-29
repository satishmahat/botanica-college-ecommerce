// src/components/RevenueChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {




  const revenueData = [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', 
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-full px-4 py-16 mt-6 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
      <div className="w-full max-w-full md:max-w-4xl mx-auto p-2 md:p-4 bg-white shadow-lg rounded-lg flex flex-col shrink">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
        <div className="flex justify-center flex-grow">
          <div className="w-full h-auto md:h-[400px] shrink-0">
            <Bar data={data} options={options} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>


  );
};

export default RevenueChart;