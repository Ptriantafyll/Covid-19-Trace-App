import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import CovidTestHistoryTable from "../../Components/Tables/CovidTestHistoryTable";
import UserContext from "../../Store/UserContext";

function CovidTestHistoryPage() {
  const user_context = useContext(UserContext);
  const [myTableData, setMyTableData] = useState(null);

  if (myTableData === null) {
    getCovidTests();
  }

  function getCovidTests() {
    const tests = user_context.covid_tests;
    console.log(user_context);
    console.log(tests);
    if (tests.length > 0 && tests[0] !== undefined) {
      tests.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setMyTableData(
        tests.map((test) => {
          var date = test.date;
          return (
            <tr key={test.date + test.result}>
              <td>{date.slice(0, 10) + " " + date.slice(11, 19)}</td>
              <td>{test.result ? "Positive" : "Negative"}</td>
            </tr>
          );
        })
      );
    }
  }
  return myTableData === null ? (
    <div>
      <h1 className="text-center mt-3">
        You have never submitted a test for Covid-19
      </h1>
    </div>
  ) : (
    <>
      <h2 className="text-center mt-3">Your Tests:</h2>
      <Container className="mt-3 w-50 mx-auto p-3">
        <CovidTestHistoryTable tableData={myTableData} />
      </Container>
    </>
  );
}

export default CovidTestHistoryPage;
