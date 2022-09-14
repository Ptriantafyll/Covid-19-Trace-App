import { Table } from "react-bootstrap";

function CovidTestHistoryTable(props) {
  return (
    <Table className="table-striped table-bordered">
      <thead>
        <tr>
          <th className="w-50">Date</th>
          <th className="w-50">Result</th>
        </tr>
      </thead>
      <tbody>{props.tableData}</tbody>
    </Table>
  );
}

export default CovidTestHistoryTable;
