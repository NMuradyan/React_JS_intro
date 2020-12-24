import request from "../Helpers/request";
import * as actionTypes from "./actionTypes";

export function getTasks() {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request("http://localhost:3001/task")
      .then((res) => {
        dispatch({ type: actionTypes.GET_TASKS_SUCCESS, tasks: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function addTask(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request("http://localhost:3001/task", "POST", info)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request(`http://localhost:3001/task/${taskId}`, "DELETE")
      .then((res) => {
        dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId});
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeSelected(selectedTasksId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request("http://localhost:3001/task", "PATCH", {tasks: selectedTasksId })
      .then(() => {
        dispatch({ type: actionTypes.REMOVE_SELECTED_TASK_SUCCESS, selectedTasksId});
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}