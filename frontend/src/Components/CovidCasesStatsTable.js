import { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import UserContext from "../Store/CurrentUserContext";

function CovidCasesStatsTable(props) {
  const user_context = useContext(UserContext);
  const current_user = user_context.username;

  return (
    <div>
      <h1 className="text-center">user is {current_user}</h1>

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
