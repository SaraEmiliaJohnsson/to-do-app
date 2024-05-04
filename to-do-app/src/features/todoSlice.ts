import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../main";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [] as Todo[]
};



export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const todosCollection = collection(db, 'todos');
        const todoSnapshot = await getDocs(todosCollection);

        const todoList = todoSnapshot.docs.map(doc => ({
            ...doc.data() as Todo,
            id: doc.id
        }));
        return todoList;
    } catch (error) {
        return rejectWithValue('Failed to fetch todos');
    }

});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;

        });
    }

});


export const { addTodo, toggleTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default todoSlice.reducer;