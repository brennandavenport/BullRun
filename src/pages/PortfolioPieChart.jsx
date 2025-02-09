import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWithCenter = ({ backendData }) => {
  // Extract data from backend response
  const { total_invested, total_current_value, investment_breakdown } = backendData;

  // Generate labels, data, and colors dynamically
  const labels = investment_breakdown.map(item => item.stock_name);
  const dataValues = investment_breakdown.map(item => item.total_current_value);
  const backgroundColors = [
    '#4285F4', // Blue
    '#F65314', // Orange
    '#34A853', // Green
    '#FBBC05', // Yellow
    '#EA4335', // Red
    '#000000', // Black
    // Add more colors if needed
  ].slice(0, investment_breakdown.length); // Ensure we have enough colors

  const data = {
    labels: labels,
    datasets: [{
      data: dataValues,
      backgroundColor: backgroundColors,
      borderWidth: 0,
    }]
  };

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
      ctx.fillText(`$${total_current_value.toLocaleString('en-US')}`, width / 2, height / 2 + 15);
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
            const percentage = ((value / total_current_value) * 100).toFixed(1) + '%';
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

const PortfolioPieChart = () => {
  const [backendData, setBackendData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const userId = localStorage.getItem('user');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/main/investments/get_portfolio_breakdown/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!backendData) {
    return <div>No data available</div>;
  }

  return <PieChartWithCenter backendData={backendData} />;
};

export default PortfolioPieChart;