import { Chart } from "react-google-charts";

function DailyStats(props) {
  const options = {
    title: props.title,
    // sliceVisibilityThreshold: 0.2, // 20%
    hAxis: {
      minValue: 0,
      maxValue: props.maxValue,
    },
    vAxis: {
      title: "Day",
    },
    legend: {
      position: "bottom",
    },
    colors: props.colors,
  };
  return (
    <Chart
      chartType="BarChart"
      options={options}
      width="100%"
      height="400px"
      data={props.data}
    />
  );
}

export default DailyStats;
