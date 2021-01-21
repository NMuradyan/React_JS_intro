import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  task: null,
  form: [],
  errorMassage: null,
  successMassage: null,
  addSuccessTask: false,
  sendSuccessMessage: false,
  loading: false,
  removeSuccessTask: false,
  removeSingleSuccessTask: false,
  editSuccessTask: false,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
        addSuccessTask: false,
        errorMassage: null,
        successMassage: null,
        sendSuccessMessage: false,
        removeSuccessTask: false,
        removeSingleSuccessTask: false,
        editSuccessTask: false,
      };
    }

    case actionTypes.ERROR: {
      return {
        ...state,
        errorMassage: action.error,
        loading: false,
      };
    }

    case actionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    }

    case actionTypes.ADD_TASK_SUCCESS: {
      const tasks = [...state.tasks, action.task];

      return {
        ...state,
        tasks: tasks,
        loading: false,
        addSuccessTask: true,
        successMassage: "Task added successfully",
      };
    }

    case actionTypes.REMOVE_TASK_SUCCESS: {
      if (action.from === "single") {
        return {
          ...state,
          task: null,
          loading: false,
          successMassage: "Task removed successfully",
          removeSingleSuccessTask: true,
        };
      } else {
        const newTasks = state.tasks.filter(
          (task) => task._id !== action.taskId
        );

        return {
          ...state,
          tasks: newTasks,
          loading: false,
          successMassage: "Task removed successfully",
        };
      }
    }

    case actionTypes.REMOVE_SELECTED_TASK_SUCCESS: {
      let tasks = [...state.tasks];

      action.selectedTasksId.forEach((id) => {
        tasks = tasks.filter((task) => task._id !== id);
      });

      return {
        ...state,
        tasks: tasks,
        loading: false,
        successMassage: "Tasks removed successfully",
        removeSuccessTask: true,
      };
    }

    case actionTypes.EDIT_TASK_SUCCESS: {
      if (action.from === "single") {
        return {
          ...state,
          task: action.task,
          loading: false,
          editSuccessTask: true,
          successMassage: "Task edited successfully",
        };
      } else {
        const tasks = [...state.tasks];

        const getTaskIndex = tasks.findIndex(
          (task) => task._id === action.task._id
        );
        tasks[getTaskIndex] = action.task;
        return {
          ...state,
          tasks: tasks,
          loading: false,
          editSuccessTask: true,
          successMassage: "Task edited successfully",
        };
      }
    }

    case actionTypes.GET_SINGLE_TASK_SUCCESS: {
      return {
        ...state,
        task: action.task,
        loading: false,
      };
    }

    case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
      let message;
      if (action.task.status === "done") {
        message = "Task copleted";
      } else {
        message = "Task is active now";
      }

      if (action.from === "single") {
        return {
          ...state,
          task: action.task,
          loading: false,
          editSuccessTask: true,
          successMassage: message,
        };
      } else {
        const tasks = [...state.tasks];

        const getTaskIndex = tasks.findIndex(
          (task) => task._id === action.task._id
        );
        tasks[getTaskIndex] = action.task;
        return {
          ...state,
          tasks: tasks,
          loading: false,
          editSuccessTask: true,
          successMassage: message,
        };
      }
    }

    case actionTypes.GET_FORM_MESSAGE: {
      return {
        ...state,
        loading: false,
        sendSuccessMessage: true,
        successMassage: "Message send successfully",
      };
    }

    default:
      return state;
  }
};
