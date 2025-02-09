import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWithCenter = () => {
  const data = {
    labels: ['Cash', 'Nvidia', 'Apple', 'Bitcoin', 'S&P 500', 'Tesla'],
    datasets: [{
      data: [1500, 2000, 1000, 1200, 2800, 1500],
      //change color here
      backgroundColor: [
        '#4285F4',
        '#F65314',
        '#34A853',
        '#FBBC05',
        '#EA4335',
        '#000000'
      ],
      borderWidth: 0,
    }]
  };

    // Calculate total
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

    // Custom center text plugin
    const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const { ctx, chartArea: { width, height } } = chart;
        ctx.save();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#e3e3e3';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Total', width / 2, height / 2 - 15);
        ctx.font = '20px Arial';
        // Format number with commas
        ctx.fillText(`$${total.toLocaleString('en-US')}`, width / 2, height / 2 + 15);
        ctx.restore();
    }
    };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 15,
          color: 'white'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            return `${label}: $${value} (${percentage})`;
          }
        }
      }
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      height: '400px', 
      color: 'white',
      width: '400px',
      margin: '0 auto'
    }}>
      <Doughnut 
        data={data} 
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default PieChartWithCenter;