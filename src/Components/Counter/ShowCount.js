import React from "react";
import { connect } from "react-redux";

function ShowCount(props) {
  return <p>{props.value}</p>;
}

const mapStateToProps = (state) => {
  return {
    value: state.count,
  };
};

export default connect(mapStateToProps, null)(ShowCount);
