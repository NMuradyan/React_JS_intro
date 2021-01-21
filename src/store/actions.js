import request from "../Helpers/request";
import * as actionTypes from "./actionTypes";

const apiUrl = process.env.REACT_APP_API_URL;

export function getTasks(data = {}) {
  let url = `${apiUrl}/task`;
  let query = "?";

  for (let key in data) {
    let value = data[key];
    query = `${query}${key}=${value}&`;
  }

  if (query === "?") {
    query = "";
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(url + query)
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
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task`, "POST", info)
      .then((res) => {
        dispatch({ type: actionTypes.ADD_TASK_SUCCESS, task: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function removeTask(taskId, from = "tasks", redirect) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task/${taskId}`, "DELETE")
      .then((res) => {
        dispatch({ type: actionTypes.REMOVE_TASK_SUCCESS, taskId, from });
        if (from === "single") {
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
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task`, "PATCH", { tasks: selectedTasksId })
      .then(() => {
        dispatch({
          type: actionTypes.REMOVE_SELECTED_TASK_SUCCESS,
          selectedTasksId,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function saveEdited(data, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task/${data._id}`, "PUT", data)
      .then((editedTask) => {
        dispatch({
          type: actionTypes.EDIT_TASK_SUCCESS,
          task: editedTask,
          from,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function getSingleTask(taskId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task/${taskId}`)
      .then((res) => {
        dispatch({ type: actionTypes.GET_SINGLE_TASK_SUCCESS, task: res });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function changeTaskStatus(id, data, from) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/task/${id}`, "PUT", data)
      .then((editedTask) => {
        dispatch({
          type: actionTypes.CHANGE_TASK_STATUS_SUCCESS,
          task: editedTask,
          from,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.ERROR, error: err.message });
      });
  };
}

export function sendFormMessage(info) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    request(`${apiUrl}/form`, "POST", info)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_FORM_MESSAGE,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.ERROR,
          error: "Somthing wrong !!! Please check info one more time !!!",
        });
      });
  };
}
