import React from "react";
import style from "./task.module.css"

function Task(props){
    return (
        <li className={style.task}>{props.data}</li>
    );

}

export default Task;