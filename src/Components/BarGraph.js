import React from "react";
import { Bar } from "react-chartjs-2";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BarGraph = (props) => {

  const matches = useMediaQuery('(min-width:800px)');

  const userNames = props.userNames.map((name,index)=>{
    return name.split(" ")[0]
  })


  const data = {
    labels: userNames,
    datasets: [
      {
        label: "Total Fine Paid ₹",
        data: props.totalFinePaidAmounts,
        backgroundColor: "rgba(7,0,32)",
        borderColor:"rgba(7,0,32)",
      },
    ],  
  };

  const options = {
    indexAxis: matches ? "x" : "y",

    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 85,
          minRotation: 0,
        },
       
      },
      y: {
        ticks: {
          autoSkip: false,
          maxRotation: 40,
          minRotation: 0,
        },
      },
    },

    animation: {
      duration: 2000,
      easing: "easeInOutBack",
    },

    maintainAspectRatio: false,

    elements: {
      bar: {
        borderRadius: 5,
      },
    },

    plugins: {
      title: {
        display: true,
        text: "Total Fine Paid  Analysis",
        font: {
          size: 20,
        },
      },
      legend: {
        display: "true",
        position: "top",
        align: "center",
      },
    },

  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
