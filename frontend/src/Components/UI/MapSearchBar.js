import { useRef } from "react";

function MapSearchBar(props) {
  const POIsearchRef = useRef();

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      props.onEnteredSearch(POIsearchRef.current.value);
    }
  }

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <input
          type="text"
          placeholder="search"
          ref={POIsearchRef}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </div>
  );
}

export default MapSearchBar;
