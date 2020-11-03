import React from "react";
import Task from "./Task";

class ToDo extends React.Component {
  state = {
    tasks: [],
    inputValue: "",
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  addTask = () => {
    const { inputValue } = this.state;
    const tasks = [...this.state.tasks];
    tasks.push(inputValue);
    this.setState({
      tasks: tasks,
      inputValue: "",
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <input
          onChange={this.handleChange}
          value={inputValue}
          type="text"
          placeholder="add task"
        />

        <input onClick={this.addTask} type="button" value="Add" />
        <ol>
          {this.state.tasks.map((task, index) => {
            return <Task key={index} data={task} />;
          })}
        </ol>
      </div>
    );
  }
}

export default ToDo;
