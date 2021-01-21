import React from "react";
import DatePicker from "react-datepicker";

export default class ShowDate extends React.Component {
  constructor(props) {
    super(props);
    const { date } = props.data;

    this.state = {
      ...props.data,
      date: date ? new Date(date) : new Date(),
    };
  }
  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  render() {
    return (
      <DatePicker selected={this.state.date} minDate={new Date()} inline />
    );
  }
}
