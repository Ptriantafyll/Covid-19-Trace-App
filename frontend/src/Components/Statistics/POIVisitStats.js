import { Chart } from "react-google-charts";

function POIVisitStats(props) {
  const options = {
    legend: "none",
    title: "Types of pois ranked by visits",
    vAxis: {
      title: props.vaxistitle,
      minValue: 0,
    },
    hAxis: {
      title: "Points of Interest",
    },
    colors: props.colors,
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
