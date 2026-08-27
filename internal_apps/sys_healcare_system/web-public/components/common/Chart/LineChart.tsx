import React, { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import moment from 'moment';

interface ChartSeries {
  name: string;
  data: number[];
}

interface ChartOptions {
  chart: {
    height: number;
    zoom: {
      enabled: boolean;
    };
  };
  colors: string[];
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    curve: 'straight' | 'smooth' | 'stepline';
  };
  grid: {
    row: {
      colors: string[];
      opacity: number;
    };
  };
  xaxis: {
    categories: string[] | undefined;
  };
}

interface ChartData {
  series: ChartSeries[];
  options: ChartOptions;
}

const LineChart: React.FC = () => {
  const [thisWeek, setThisWeek] = useState<string[]>();

  useEffect(() => {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var temp: string[] = [];

    for (var i = 0; i < 7; i++) {
      var next = new Date(curr.getTime());
      next.setDate(first + i + 1);
      temp.push(moment(next.toString()).format('DD/MM'));
    }

    setThisWeek(temp);
  }, []);

  const chartData: ChartData = {
    series: [{
      name: "Lượt truy cập",
      data: [10, 41, 35, 51, 49, 62, 69]
    }],
    options: {
      chart: {
        height: 350,
        zoom: {
          enabled: false
        }
      },
      colors: ['#00A79D'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f6f9', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: thisWeek,
      }
    },
  };

  return (
    <Fragment>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </Fragment>
  );
};

export default LineChart;