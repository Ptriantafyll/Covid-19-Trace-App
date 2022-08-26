import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";

// TODO: change the whole function after i work out the search
// so that after you click the button all the searched POIs get fetched

function MapSearchBar(props) {
  const POIsearchRef = useRef();
  function searchHandler(event) {
    event.preventDefault();
    const enteredPOISearch = POIsearchRef.current.value;

    const enteredPOI = {
      enteredPOISearch,
    };

    props.onEnteredSearch(enteredPOI);
  }

  return (
    <div className="container d-flex justify-content-center">
      <input className="me-3" type="text" ref={POIsearchRef}></input>
      <button className="btn btn-primary" onClick={searchHandler}>
        Search
      </button>
    </div>
  );
}

export default MapSearchBar;
