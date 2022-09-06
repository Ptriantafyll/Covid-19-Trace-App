import { useContext, useState } from "react";
import CovidTestHistoryTable from "../../Components/CovidTestHistoryTable";
import UserContext from "../../Store/CurrentUserContext";

function CovidTestHistoryPage() {
  const user_context = useContext(UserContext);
  console.log(user_context.covid_tests);

  const [myTableData, setMyTableData] = useState(null);

  if (myTableData === null) {
    getCovidTests();
  }

  function getCovidTests() {
    const tests = user_context.covid_tests;
    // tests.sort(
    //   (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    // );
    // console.log(tests);

    if (tests.length > 0) {
      setMyTableData(
        tests.map((test) => {
          var date = test.date;
          // console.log(typeof date);

          // console.log(date.slice(0, 10) + " " + date.slice(11, 19));

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
  return <CovidTestHistoryTable tableData={myTableData} />;
}

export default CovidTestHistoryPage;
