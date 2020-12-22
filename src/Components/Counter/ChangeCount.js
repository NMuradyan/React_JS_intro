import React from "react";
import { connect } from "react-redux";

function ChangeCount(props) {
  return (
    <>
      <div>
        <button onClick={() => props.onChange(1)}>+</button>
        <button onClick={() => props.onChange(-1)}>-</button>
      </div>
      <div>
        <button onClick={() => props.onChange(5)}>+5</button>
        <button onClick={() => props.onChange(-5)}>-5</button>
      </div>
      <div>
        <button onClick={() => props.onChange(10)}>+10</button>
        <button onClick={() => props.onChange(-10)}>-10</button>
      </div>
      <div>
        <button onClick={() => props.onReset()}>Reset</button>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (val) => {
      dispatch({ type: "CHANGE_VAL", value: val });
    },
    onReset: (val) => {
      dispatch({ type: "RESET_VAL", value: val });
    },
  };
};

export default connect(null, mapDispatchToProps)(ChangeCount);
