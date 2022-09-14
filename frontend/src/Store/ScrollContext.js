import { createContext, useState } from "react";

const ScrollContext = createContext({
  reference: null,
  setReference: (ref) => {},
});

export function ScrollContextProvider(props) {
  const [myref, setMyref] = useState(0);

  function setReferenceHandler(ref) {
    setMyref(ref);
    console.log(ref);
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    // if (ref === "Last stat") {
    // console.log("here");
    // }
  }

  const context = {
    reference: myref,
    setReference: setReferenceHandler,
  };

  return (
    <ScrollContext.Provider value={context}>
      {props.children}
    </ScrollContext.Provider>
  );
}

export default ScrollContext;
