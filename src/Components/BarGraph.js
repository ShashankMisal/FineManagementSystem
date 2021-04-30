import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = (props) => {

  const userNames = props.userNames.map((name,index)=>{
    return name.split(" ")[0]
  })

  const colorArray = [
          
    "rgba(255, 255, 0, 1)" ,//yellow,
    "rgba(154, 154, 0, 1)",//yellowDarkShade
    "rgba(255, 0, 0, 1)",//red
    "rgba(148, 0, 0, 1)",//redDarkShade
    "rgba(255, 88, 0, 1)",//orange
    "rgba(152, 52, 0, 1)",//orangeDarkShade
    "rgba(183, 255, 0, 1)",//lightGreen
    "rgba(111, 155, 0, 1)",//lightGreenDarkShade
    "rgba(0, 255, 162, 1)",//bluishGreen
    "rgba(0, 145, 92, 1)",//bluishGreenDarkShade
    "rgba(0, 244, 247, 1)",//skyBlue
    "rgba(0, 142, 144, 1)",//skyBlueDarkShade
    "rgba(0, 109, 255, 1)",//blue
    "rgba(2, 54, 124, 1)",//blueDarkShade
    "rgba(171, 163, 230, 1)",//purple
    "rgba(90, 80, 172, 1)",//purlpeDarkShade
    "rgba(247, 0, 255, 1)",//voilet
    "rgba(247, 0, 255, 1)",//voiletDarkShade
    "rgba(255, 0, 194, 1)",//pink
    "rgba(255, 135, 226, 1)",//babyPink
    "rgba(255, 0, 77, 1)",//crimson
    "rgba(184, 167, 167, 1)",//lightgray
    "rgba(104, 94, 94, 1)",//darkGray
    "rgba(179, 243, 132, 1)",//pistaGreen
    "rgba(187, 122, 19, 1)",//yellowishBrown
    "rgba(0, 0, 0, 1)",//black
  ]
 
  const data = {
    labels: userNames,
    datasets: [
      {
        label: "Total Fine Paid ₹",
        data: props.totalFinePaidAmounts,
        backgroundColor: colorArray,
        borderColor:colorArray,
      },
    ],  
  };

  const options = {
    indexAxis: window.outerWidth < 880 ? "y" : "x",

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
