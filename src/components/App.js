import React from "react";
import { connect } from "react-redux";

import Selector from "./Selector";
import { selectReddit, invalidateReddit } from "../actions";
import Posts from "./Posts";

const App = ({
  selectRedditDispatch,
  selectedReddit,
  isFetching,
  items,
  lastUpdated,
  invalidateRedditDispatch,
}) => {
  const handleOnSelect = (selectedValue) => {
    selectRedditDispatch(selectedValue);
  };

  const handleRefreshClick = () => {
    invalidateRedditDispatch(selectedReddit);
  };

  return (
    <div>
      <Selector
        redditValue={selectedReddit}
        onSelect={handleOnSelect}
        options={["reactjs", "reduxjs", "javascript"]}
      />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        )}
        {!isFetching && (
          <button onClick={handleRefreshClick}>
            Refresh
          </button>
        )}
      </p>
      {isFetching && items.length === 0 && <h2>Loading...</h2>}
      {isFetching && items.length > 0 && <h2>Refreshing...</h2>}
      {!isFetching && items.length === 0 && <h2>Empty</h2>}
      {!isFetching && items.length > 0 && (
        <div>
          <Posts posts={items} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ selectedReddit, postsByReddit }) => {
  return {
    selectedReddit,
    ...postsByReddit[selectedReddit],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRedditDispatch: (value) => dispatch(selectReddit(value)),
    invalidateRedditDispatch: (value) => dispatch(invalidateReddit(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
