import { Container, Table } from "react-bootstrap";

function CovidTestHistoryTable(props) {
  return (
    <div>
      <h1 className="text-center">Your Tests:</h1>

      <Container className="mt-3 w-75">
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th className="w-50">Date</th>
              <th className="w-50">Result</th>
            </tr>
          </thead>
          <tbody>{props.tableData}</tbody>
        </Table>
      </Container>
    </div>
  );
}

export default CovidTestHistoryTable;
