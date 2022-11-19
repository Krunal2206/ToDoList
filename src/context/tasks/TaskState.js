import { addDoc, collection, serverTimestamp, getDocs, orderBy, query, where } from 'firebase/firestore/lite';
import React, { useContext, useState } from 'react'
import db from '../../firebase';
import AuthContext from '../authentication/AuthContext';
import TaskContext from './TaskContext'
import toast from 'react-hot-toast';

const TaskState = (props) => {

    const { user } = useContext(AuthContext);
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [completedTask, setCompletedTask] = useState(0);
    const [remainingTask, setRemainingTask] = useState(0);

    const addTask = async () => {
        if (task.length === 0) {
            window.alert("Please Add Item.");
        } else {
            await addDoc(collection(db, "users", user.uid, "list"), {
                task: task,
                timestamp: serverTimestamp(),
                completed: false
            });
            getData()
            remainingTaskLength()
            applyToast('Task Added Successfully!')
            setTask("")
        }
    }

    const handleTask = async (e) => {
        if (e.key === "Enter") {
            if (task.length === 0) {
                window.alert("Please Add Item.");
            } else {
                await addDoc(collection(db, "users", user.uid, "list"), {
                    task: task,
                    timestamp: serverTimestamp(),
                    completed: false
                });
                getData()
                remainingTaskLength()
                applyToast('Task Added Successfully!')
                setTask("")
            }
        }
    }

    const getData = async () => {
        const q = query(collection(db, `users/${user.uid}/list`), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        setTaskList(data);
    }

    const completedTaskLength = async () => {
        const q = query(collection(db, 'users', user.uid, 'list'), where("completed", "==", true));
        const querySnapshot = await getDocs(q);
        setCompletedTask(querySnapshot.size)
    }

    const remainingTaskLength = async () => {
        const q = query(collection(db, 'users', user.uid, 'list'), where("completed", "==", false));
        const querySnapshot = await getDocs(q);
        setRemainingTask(querySnapshot.size)
    }

    const applyToast = (message) => {
        toast.success(message, {
            position: "bottom-center",
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    }

    return (
        <TaskContext.Provider value={{ user, addTask, handleTask, getData, task, setTask, taskList, completedTaskLength, completedTask, remainingTaskLength, remainingTask, applyToast }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState
