import { Chart } from "react-google-charts";

function HourlyStats(props) {
  const options = {
    title: props.title,
    // sliceVisibilityThreshold: 0.2, // 20%
    vAxis: {
      minValue: 0,
    },
    hAxis: {
      title: "Hour",
    },
    legend: {
      position: "top",
    },
    colors: props.colors,
  };
  return (
    <Chart
      chartType="LineChart"
      options={options}
      width="100%"
      height="400px"
      data={props.data}
    />
  );
}

export default HourlyStats;
