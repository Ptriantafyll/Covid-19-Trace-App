import { Table } from "react-bootstrap";

function VisitHistoryTable(props) {
  return (
    <Table className="table-striped table-bordered">
      <thead>
        <tr>
          <th className="w-50">Point of Interest</th>
          <th className="w-50">Date</th>
        </tr>
      </thead>
      <tbody>{props.tableData}</tbody>
    </Table>
  );
}

export default VisitHistoryTable;
