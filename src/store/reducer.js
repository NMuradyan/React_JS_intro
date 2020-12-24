import * as actionTypes from "./actionTypes";

const defaultState = {
  tasks: [],
  errorMassage: null,
  successMassage: null,
  addSuccessTask: false,
  loading: false,
  removeSuccessTask: false
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
        removeSuccessTask: false
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
      const newTasks = state.tasks.filter((task) => task._id !== action.taskId);

      return {
        ...state,
        tasks: newTasks,
        loading: false,
        successMassage: "Task removed successfully",
      };
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
        removeSuccessTask: true
      };
    }
  
    default:
      return state;
  }

};
