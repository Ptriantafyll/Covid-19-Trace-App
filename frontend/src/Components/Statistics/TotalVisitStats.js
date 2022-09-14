import { Chart } from "react-google-charts";

function TotalVisitStats(props) {
  const totalvisits = props.totalvisits;

  const options = {
    title: "Total Visits: " + totalvisits,
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

export default TotalVisitStats;
