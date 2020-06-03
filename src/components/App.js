import React, { useState } from "react";

import Selector from "./Selector";

const App = () => {
  const [redditValue, setRedditValue] = useState("reactjs");

  const handleOnSelect = (selectedValue) => {
    setRedditValue(selectedValue);
  };

  return (
    <div>
      <Selector
        redditValue={redditValue}
        onSelect={handleOnSelect}
        options={["reactjs", "redux","redux-saga"]}
      />
    </div>
  );
};

export default App;
