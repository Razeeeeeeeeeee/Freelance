import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const Graph = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Cleanup previous chart instance if it exists
    if (Chart.getChart("myChart")) {
      Chart.getChart("myChart")?.destroy();
    }

    // Create new chart instance
    const ctx = document.getElementById("myChart").getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data[0],
        datasets: [
          {
            label: "Happiness",
            data: data[1],
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
  }, [data, chartInstance]);

  return (
    <div>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
};

export default Graph;
