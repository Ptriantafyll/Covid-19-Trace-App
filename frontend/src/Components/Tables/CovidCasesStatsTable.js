import { Table } from "react-bootstrap";

function CovidCasesStatsTable(props) {
  return (
    <Table className="table-striped table-bordered ">
      <thead>
        <tr>
          <th className="w-50">Point Of Interest</th>
          <th className="w-50">Date</th>
        </tr>
      </thead>
      <tbody>{props.tableData}</tbody>
    </Table>
  );
}

export default CovidCasesStatsTable;
