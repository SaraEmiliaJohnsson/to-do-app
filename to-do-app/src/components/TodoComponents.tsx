
import { addTodo, selectTodos, toggleTodo } from "../features/todoSlice";
import { addDoc, collection } from "firebase/firestore";
import db from "../features/firebaseConfig"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const TodoComponent = () => {
    const [newTodoText, setNewTodoText] = useState('');
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const handleAddTodo = async () => {
        if (newTodoText.trim()) {
            try {
                const docRef = await addDoc(collection(db, "todos"), {
                    text: newTodoText,
                    completed: false,
                    createdAt: new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                dispatch(addTodo({
                    id: docRef.id,
                    text: newTodoText,
                    completed: false
                }));
                setNewTodoText('');
            } catch (e) {
                console.error("Error adding document: ", e);


            }

        }
    };





    const handleToggleTodo = (id: string) => {
        dispatch(toggleTodo(id));
    };

    return (
        <>
            <h1>Todo List</h1>
            <input type="text" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} placeholder="Add a new todo..." />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ol>
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => handleToggleTodo(todo.id)}>
                        {todo.text}

                    </li>
                ))}
            </ol>
        </>
    );
};

export default TodoComponent;