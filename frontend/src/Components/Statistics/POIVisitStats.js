import { Chart } from "react-google-charts";

function POIVisitStats(props) {
  const options = {
    legend: "none",
    title: "Types of pois ranked by visits",
    // sliceVisibilityThreshold: 0.2, // 20%
    vAxis: {
      title: props.vaxistitle,
      minValue: 0,
    },
    hAxis: {
      title: "Points of Interest",
    },
  };
  return (
    <Chart
      chartType="ColumnChart"
      options={options}
      width="100%"
      height="400px"
      data={props.data}
    />
  );
}

export default POIVisitStats;
