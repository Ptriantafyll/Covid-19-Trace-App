import { Chart } from "react-google-charts";

function TotalCovidCasesStats(props) {
  const totalcases = props.totalcases;

  const options = {
    title: "Total Cases: " + totalcases,
    // sliceVisibilityThreshold: 0.2, // 20%
  };
  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default TotalCovidCasesStats;
