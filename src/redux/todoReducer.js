import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//set initial state for todoApp
const initialState = {
    todos:[{text:"Breakfast at 8 am",completed:true},
            {text:"Meeting at 11 am",completed:false}]
    
};

// export const getInitialState = createAsyncThunk('todos/getInitialState',(arg,thunkAPI)=>{
//     axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
//         console.log(res.data);
//         thunkAPI.dispatch(todoActions.setInitialState(res.data));
//     })
// })  


//getData from api which are provided using createAsyncThunk and axios library.
export const getInitialState = createAsyncThunk('todos/getInitialState',
    ()=>{
        return axios.get('https://jsonplaceholder.typicode.com/todos');
    }
    );


//posting data in dummy api using addTodoAsync
export const addTodoAsync = createAsyncThunk('todos/add',

        async(payload)=>{
            let response = await fetch('https://jsonplaceholder.typicode.com/todos',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    title:payload,
                    completed:false
                })
            }) 
            return response.json();
});

//updating data using updateTodoAsynce function 
export const updateTodoAsync = createAsyncThunk('todos/update',
    async(payload)=>{
        let response = await fetch('https://jsonplaceholder.typicode.com/todos',
        {
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(
                {
                    id:payload,
                    title:"Updated Todo",
                    body:'bar',
                    completed:false,
                }
            )
        }    
        )
    }
)
//create todoSlice
const todoSlice = createSlice({
    name:'todos',
    initialState:initialState,
    reducers:{
        setInitialState:(state,action)=>{
            state.todos=[...action.payload]
        },
        add:(state,action)=>{
            state.todos.unshift({
                text:action.payload,
                completed:false
            })
        },
        toggle:(state,action)=>{
            state.todos.map((todo,i)=>{
                if(i==action.payload){
                    todo.completed = !todo.completed
                }
                return todo;
            })
        },
        update:(state,action)=>{
            state.todos.map((todo,index)=>{
                if(index==action.payload){
                    todo.title=prompt("enter text");
                    todo.completed= false
                }
                return todo
            })
        },
        delete:(state,action)=>{
            state.todos.splice(action.payload,1);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getInitialState.fulfilled,(state,action)=>{
            state.todos = [...action.payload.data]
        }).addCase(addTodoAsync.fulfilled,(state,action)=>{
            state.todos.unshift(action.payload)
        })
    }
});
//todoReducer
export const todoReducer = todoSlice.reducer;

//todo Actions
export const todoActions = todoSlice.actions;

//todoSelectors
export const todoSelector = (state)=>state.todoReducer.todos;