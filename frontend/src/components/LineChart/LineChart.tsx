import { useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true 
    }
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false 
      }
    },
    y: {
      display: false,
      grid: {
        display: false 
      }
    }
  },
  elements: {
    point: {
      radius: 0 
    },
    line: {
      borderWidth: 0 
    }
  }
};

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: (number | undefined)[];
    borderColor: string;
    backgroundColor: string;
    fill: string;
    tension:number;
  }[];
}

interface DataItem {
  _id: {
    day: number;
    month: number;
    year: number;
  };
  count: number;
}

function processData(data: DataItem[], start: Date): number[] {
  // Calculate the end date of the month
  const endDate = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  const numDays = endDate.getDate();

  // Create a mapping from day to count
  const dayMap: { [key: number]: number } = {};
  data.forEach(item => {
    const { day } = item._id;
    dayMap[day] = item.count;
  });

  // Fill the array with the count for each day, defaulting to 0 if no data present
  const processedData: number[] = [];
  for (let day = 1; day <= numDays; day++) {
    processedData.push(dayMap[day] || 0);
  }

  return processedData;
}



function generateLabels(start: Date): string[] {
  const labels: string[] = [];
  for (let i = 0; i < 31; i++) {
    const day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    labels.push(`${day.getDate()}-${day.getMonth() + 1}`);
    if (day.getMonth() !== start.getMonth()) break;
  }
  return labels;
}export function LineChart({ chartData }: { chartData: any }) {
  const currentDate = new Date();
  const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

  const processedPreviousMonthData = processData(chartData.previousMonth, previousMonthStart);
  const processedCurrentMonthData = processData(chartData.currentMonth, currentDate);

  const labels = generateLabels(previousMonthStart);

  const [data, _] = useState<ChartData>({
    labels,
    datasets: [
      {
        label: "Previous Month",
        data: processedPreviousMonthData,
        borderColor: "rgba(7, 148, 85, 0.5)",
        backgroundColor: "rgba(7, 148, 85, 0.3)", 
        fill: "origin",
        tension: 0.4 
      },
      {
        label: "Current Month",
        data: processedCurrentMonthData,
        borderColor: "#079455",
        backgroundColor: "rgba(7, 148, 85, 0.5)", 
        fill: "origin",
        tension: 0.4
      }
    ]
  });

  return <div className='bg-white rounded-[12px] overflow-hidden' style={{ maxWidth: '100%' }}>
    <Line data={data} options={options} />
  </div>;
}
