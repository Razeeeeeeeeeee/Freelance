
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const Graph = ({ data, id }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Cleanup previous chart instance if it exists
    if (Chart.getChart(id)) {
      Chart.getChart(id)?.destroy();
    }

    // Create new chart instance
    const ctx = document.getElementById(id).getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Happiness",
            data: Object.values(data),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Set the new chart instance
    setChartInstance(newChartInstance);
  }, [data, id]);

  return (
    <div>
      <canvas id={id} width="400" height="200"></canvas>
    </div>
  );
};

export default Graph;

