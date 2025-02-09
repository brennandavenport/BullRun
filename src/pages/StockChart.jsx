import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto'; // Make sure to install chart.js@4.4.0
import './StockChart.css'

const StockChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (!canvasRef.current || !data) return;
  
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
  
      // Cleanup previous chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      // Get canvas dimensions
      const chartHeight = canvasRef.current.clientHeight;
      const chartWidth = canvasRef.current.clientWidth;
  
      // Calculate performance
      const firstValue = data.values[0];
      const lastValue = data.values[data.values.length - 1];
      const isPositive = lastValue >= firstValue;
  
      // Color configuration
      const chartColor = isPositive ? '#4CAF50' : '#e53935';
      const gradient = ctx.createLinearGradient(0, chartHeight, 0, 0); // Flipped gradient
      gradient.addColorStop(0, `${chartColor}33`);
      gradient.addColorStop(1, `${chartColor}00`);
  
      const config = {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            borderColor: chartColor,
            borderWidth: 2,
            tension: 0.4,
            fill: {
              target: 'origin',
              above: gradient,
            },
            pointRadius: 0,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              bottom: 20 // Add padding at bottom
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              // ... keep existing tooltip config
            }
          },
          scales: {
            x: {
              display: false,
              offset: false,
              grid: { display: false },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10
              }
            },
            y: {
              beginAtZero: false, // Keep this false for stock charts
              grace: '10%', // Add breathing space
              grid: { 
                color: '#EEE',
                drawTicks: false
              },
              ticks: {
                padding: 10,
                callback: (value) => `$${value.toFixed(2)}`
              }
            }
          }
        }
      };
  
      chartRef.current = new Chart(ctx, config);
  
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [data]);
  
    return (
      <div className="chart-container">
        <canvas ref={canvasRef} />
      </div>
    );
};

export default StockChart;