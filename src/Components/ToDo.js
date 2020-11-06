import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Task from "./task/Task";
import { Button, InputGroup, FormControl, Container} from "react-bootstrap";

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
          <Container>
        {/* <input
          onChange={this.handleChange}
          value={inputValue}
          type="text"
          placeholder="add task"
        /> */}

        {/* <input onClick={this.addTask} type="button" value="Add" /> */}
        
          <InputGroup>
            <FormControl
              onChange={this.handleChange}
              value={inputValue}
              placeholder="add task"
              aria-label="add task"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={this.addTask} variant="info">
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
        
        <ol>
          {this.state.tasks.map((task, index) => {
            return <Task key={index} data={task} />;
          })}
        </ol>
        </Container>
      </div>
    );
  }
}

export default ToDo;
