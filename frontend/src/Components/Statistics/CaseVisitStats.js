import { Chart } from "react-google-charts";

function CaseVisitStats(props) {
  const casevisits = props.casevisits;

  const options = {
    title: "Total Visits by Covid-19 Cases: " + casevisits,
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

export default CaseVisitStats;
