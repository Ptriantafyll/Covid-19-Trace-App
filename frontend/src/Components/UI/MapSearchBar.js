import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";

function MapSearchBar(props) {
  const POIsearchRef = useRef();
  function searchHandler(event) {
    event.preventDefault();
    const enteredPOISearch = POIsearchRef.current.value;

    props.onEnteredSearch(enteredPOISearch);
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
