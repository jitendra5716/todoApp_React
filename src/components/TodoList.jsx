//imports for todolist component

import style from "../style/todoList.module.css";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { todoSelector } from "../redux/todoReducer";
import { useDispatch } from "react-redux";
import { todoActions } from "../redux/todoReducer";
import { useEffect } from "react";
import axios from "axios";
import { getInitialState } from "../redux/todoReducer";

//TodoList Fuctional Component

const TodoList = ()=>{
    //todoSelector comming from todoReducer
    const todos = useSelector(todoSelector);
    //dispatch fuction used to get action of todoReducer
    const dispatch = useDispatch();

    //use api in createThunkAsync in todoReducer
    useEffect(()=>{
        // axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
        //     dispatch(todoActions.setInitialState(res.data));
        // })
        dispatch(getInitialState());

    },[]);
    return(
        <>
        <div className={style.listOuterDiv}>
            <ul>
                {todos.map((todo,index)=>{
                    
                    return(
                        <li key={index} className={style.list}>
                    <div className={style.text}>
                        {todo.title}
                    </div>
                    
                    <button id={style.toggleRes} className={todo.completed?style.toggleCompleted:style.togglePending}>{todo.completed?'completed':'pending'}</button>
                    <div className={style.buttonsDiv}>
                    <button onClick={()=>dispatch(todoActions.toggle(index))} className={style.toggle}>Toggle</button>
                    <button onClick={()=>dispatch(todoActions.update(index))} className={style.update}>update</button>
                    <button onClick={()=>dispatch(todoActions.delete(index))} className={style.delete}>Delete</button>
                    </div>
                   
                    </li>
                    )
                })}
                
            </ul>
        </div>
        </>
    )
};

export default TodoList;