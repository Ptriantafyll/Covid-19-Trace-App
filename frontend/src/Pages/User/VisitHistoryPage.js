import { useContext, useState } from "react";
import VisitsContext from "../../Store/VisitsContext";
import VisitHistoryTable from "../../Components/Tables/VisitHistoryTable";

function VisitHistoryPage() {
  const visits_context = useContext(VisitsContext);
  const [myTableData, setMyTableData] = useState(null);
  // console.log(visits_context);

  if (myTableData === null) {
    getVisits();
  }

  function getVisits() {
    console.log("here");

    const tableVisits = visits_context.all_visits_of_current_user;
    if (tableVisits !== undefined) {
      tableVisits.sort((a, b) => a.time - b.time);

      setMyTableData(
        tableVisits.map((visit) => {
          // console.log(visit);
          const tablevisitdate = new Date(parseInt(visit.time));
          const year = tablevisitdate.getFullYear();
          const month = tablevisitdate.getMonth();
          const day =
            tablevisitdate.getDay() === 0 ? 7 : tablevisitdate.getDay();
          const hour = tablevisitdate.getHours();
          const minutes = tablevisitdate.getMinutes();
          const seconds = tablevisitdate.getSeconds();

          const tabledate =
            day.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            "-" +
            month.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            "-" +
            year +
            " " +
            hour +
            ":" +
            minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            ":" +
            seconds.toLocaleString("en-US", { minimumIntegerDigits: 3 });
          return (
            <tr key={visit.user + visit.time + visit._id}>
              <td>{visit.POI}</td>
              <td>{tabledate}</td>
            </tr>
          );
        })
      );
    }
  }

  return myTableData === undefined ? (
    <div>
      <h1 className="text-center">
        You have never visited any points of interest
      </h1>
    </div>
  ) : (
    <div>
      <h1 className="text-center">Your visits:</h1>
      <VisitHistoryTable tableData={myTableData} />;
    </div>
  );
}

export default VisitHistoryPage;
