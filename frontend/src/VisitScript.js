import axios from "axios";
import CalculateDistance from "./Components/CalculateDistance";

function visitScript(num_of_users, startDate, endDate) {
  const BaseURL = "http://localhost:8000/"; // api url
  const users = [];
  var visits = [];
  var pois = [];
  const diffTime = Math.abs(startDate - endDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  axios
    .get(BaseURL + "POI")
    .then((response) => {
      pois = response.data.POIs;
      for (let i = 0; i < num_of_users; i++) {
        let username = "User" + i;
        let email = "user" + i + "@gmail.com";
        let password = username + "!pass";

        const new_user = {
          username: username,
          email: email,
          password: password,
        };

        users.push(new_user);
      }

      for (let user of users) {
        for (let i = 0; i < diffDays; i++) {
          // for each day insert a random number of visits
          let num_of_visits = Math.ceil(Math.random() * 6) + 4; // rng 5-10
          let nextvisittime;
          let firstpoi = Math.floor(Math.random() * pois.length);
          let firstvisittime =
            startDate.getTime() + 12 * 3600000 + i * 86400000;
          let randompeople = Math.ceil(Math.random() * 50); // rng 1-50
          let firstvisit = {
            user: user.username,
            POI: pois[firstpoi].name,
            POI_id: pois[firstpoi].id,
            time: firstvisittime,
            peopleEstimate: randompeople,
            covid_case: false,
          };

          visits.push(firstvisit);

          for (let j = 1; j < num_of_visits; j++) {
            // add a visit to a poi 1.5km close to the previous poi
            var currentpoi;
            var currentvisittime;
            var nextpoi;

            if (j === 1) {
              currentpoi = firstpoi;
              currentvisittime = firstvisittime;
            } else {
              currentpoi = nextpoi;
              currentvisittime = nextvisittime;
            }

            let dist = 1501;
            while (dist > 1500) {
              //1.5km distance between visits
              nextpoi = Math.floor(Math.random() * pois.length);
              dist = CalculateDistance(
                pois[currentpoi].coordinates[0].lat,
                pois[currentpoi].coordinates[0].lng,
                pois[nextpoi].coordinates[0].lat,
                pois[nextpoi].coordinates[0].lng
              );
            }

            randompeople = Math.ceil(Math.random() * 50);
            let speed = 1.4; // meters/second
            let seconds_to_next_poi = dist / speed;
            let minutes_spent = Math.ceil(Math.random() * 111) + 9; //rng 10-120 minutes
            nextvisittime =
              currentvisittime +
              seconds_to_next_poi * 1000 +
              minutes_spent * 60 * 1000;

            let nextvisit = {
              user: user.username,
              POI: pois[nextpoi].name,
              POI_id: pois[nextpoi].id,
              time: nextvisittime,
              peopleEstimate: randompeople,
              covid_case: false,
            };
            visits.push(nextvisit);
            currentpoi = nextpoi;
          }
        }
      }

      axios
        .post(BaseURL + "user/bulk", { users: users })
        .then((response) => {
          if (visits.length > 500) {
            const num_of_arrays = Math.ceil(visits.length / 500);
            for (let i = 0; i < num_of_arrays; i++) {
              let new_visits = visits.splice(0, 499);
              // bulk insert with batches of length 499
              axios
                .post(BaseURL + "visit/bulk/insert", {
                  visits: new_visits,
                })
                .then(() => {})
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

export default visitScript;
