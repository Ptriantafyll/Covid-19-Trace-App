import { Chart } from "react-google-charts";

function POIVisitStats(props) {
  const options = {
    title: "Types of pois ranked by visits",
    // sliceVisibilityThreshold: 0.2, // 20%
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
