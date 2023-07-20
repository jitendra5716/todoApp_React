//imports for todoForm components
import style from "../style/todoForm.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { todoActions } from "../redux/todoReducer";
import { addTodoAsync } from "../redux/todoReducer";

//TodoForm fuctional Component

const TodoForm = ()=>{

    //useState hooks for getting user input
    const [formText, setFormText]= useState('');

    //dispatch fuction for using action of reducer it is comming from react-redux
    const dispatch = useDispatch();
    //handleSubmit fuctions that trigger when addtodo button clicked
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(addTodoAsync(formText));
        setFormText('');
    }
    
    return(
        <>
        <div className={style.formDiv}>
            <form>
                <input onChange={(e)=>setFormText(e.target.value)} value={formText} type="text" placeholder="Enter Todo's" required name="todo"/>
                <button onClick={handleSubmit}>Add Todo</button>
            </form>
        </div>
        </>
    )
};

export default TodoForm;