import { Container, Table } from "react-bootstrap";

function VisitHistoryTable(props) {
  return (
    <div>
      <h1 className="text-center">Your visits:</h1>

      <Container className="mt-3 w-75">
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th className="w-50">Point of Interest</th>
              <th className="w-50">Date</th>
            </tr>
          </thead>
          <tbody>{props.tableData}</tbody>
        </Table>
      </Container>
    </div>
  );
}

export default VisitHistoryTable;
