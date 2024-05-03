import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./firebaseConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";



const db = getFirestore(app);

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const todosCollection = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCollection);
    const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return todoList;
})