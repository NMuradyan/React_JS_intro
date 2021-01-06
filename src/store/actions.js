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

export function removeTask(taskId, from="tasks", redirect) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request(`http://localhost:3001/task/${taskId}`, "DELETE")
      .then((res) => {
        dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId, from});
        if(from==="single"){
          redirect("/");
      }
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

export function saveEdited(data, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request(`http://localhost:3001/task/${data._id}`, "PUT", data)
      .then((editedTask) => {
        dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, task: editedTask, from});
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function getSingleTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING});
    request(`http://localhost:3001/task/${taskId}`)
      .then((res) => {
        dispatch({ type: actionTypes.GET_SINGLE_TASK_SUCCESS, task: res});
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}