import React from 'react';
import { Doughnut } from 'react-chartjs-2';


// defaults.global.legend.position = 'chartArea';

const DoughnutChart = (props) => {
  
  console.log([...props.totalFinePaidAmounts])

  const data = {
    labels : [...props.userNames],
    datasets: [
      {
        label: '# of Votes',
        data: [...props.totalFinePaidAmounts],
        backgroundColor: [
          'rgba(82, 62, 148, 1)',
          'rgba(197, 199, 29, 1.0)',
          'rgba(255, 126, 1, 1.0)',
          'rgba(18, 15, 69, 1.0)',
          'rgba(255, 232, 1, 1.0)',
          'rgba(242, 24, 14, 1.0)'  ,
          'rgba(51, 230, 9, 1.0)',
          'rrgba(30, 111, 11, 1.0)',
        ],
        borderColor: [
          'rgba(82, 62, 148, 1)',
          'rgba(197, 199, 29, 1.0)',
          'rgba(255, 126, 1, 1.0)',
          'rgba(18, 15, 69, 1.0)',
          'rgba(255, 232, 1, 1.0)',
          'rgba(242, 24, 14, 1.0)',
          'rgba(51, 230, 9, 1.0)',
          'rrgba(30, 111, 11, 1.0)',
        ],
      },
    ],
    
  };

  const options = {
    legend: {
      position: 'top',
  },
  title: {
    display: true,
    text: 'Analysis Chart' 
  },
 }



return (
  <>
    <Doughnut data={data} options={options}/>
  </>
)};

export default DoughnutChart;