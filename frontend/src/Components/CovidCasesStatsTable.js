import { Container, Table } from "react-bootstrap";

function CovidCasesStatsTable(props) {
  return (
    <div>
      <h1 className="text-center">
        You came in contact with a comfirmed Covid-19 case during these visits:
      </h1>

      <Container className="mt-3 w-75">
        <Table className="table-striped table-bordered">
          <thead>
            <tr>
              <th className="w-50">Point Of Interest</th>
              <th className="w-50">Date</th>
            </tr>
          </thead>
          <tbody>{props.tableData}</tbody>
        </Table>
      </Container>
    </div>
  );
}

export default CovidCasesStatsTable;
