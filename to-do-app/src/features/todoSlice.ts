import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./fetchTodos";
import { RootState } from "../main";

interface Todo {
    id: string;
    text?: string;
    completed?: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [] as Todo[]
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: action.payload, completed: false
            };
            state.todos.push(newTodo);
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