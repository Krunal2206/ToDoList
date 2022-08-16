import React, { useEffect, useState } from 'react'
import '../css/ToDo.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore/lite';
import db from '../firebase';
import { Tooltip, Zoom } from '@mui/material';
import ToDoLists from './ToDoLists';

const ToDo = ({ id }) => {

    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const addTask = async () => {
        if (task.length === 0) {
            window.alert("Please Add Item.");
        } else {
            await addDoc(collection(db, "users", id, "list"), {
                task: task,
                timestamp: serverTimestamp()
            });
            getData()
            setTask("")
        }
    }

    const handleTask = async (e) => {
        if (e.key === "Enter") {
            if (task.length === 0) {
                window.alert("Please Add Item.");
            } else {
                await addDoc(collection(db, "users", id, "list"), {
                    task: task,
                    timestamp: serverTimestamp()
                });
                getData()
                setTask("")
            }
        }
    }

    const getData = async () => {
        const q = query(collection(db, `users/${id}/list`), orderBy('timestamp', 'desc'))
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        setTaskList(data);
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, []);

    return (
        <div className='main_div d-flex align-items-center justify-content-center text-center'>
            <div className='center_div pt-3 bg-white'>
                <h1 className='text-white mb-3'>ToDo List</h1>
                <div className="d-flex justify-content-center flex-row gap-3">
                    <input className='text-center fs-5 bg-transparent' type="text" placeholder="Add a Item" onKeyPress={handleTask} value={task} onChange={(e) => {
                        setTask
                            (e.target.value)
                    }} />
                    <Tooltip title='Add' placement="bottom" TransitionComponent={Zoom} arrow>
                        <AddCircleOutlineOutlinedIcon className='add' role="button" onClick={addTask} />
                    </Tooltip>
                </div>

                <ol className='mt-3'>
                    {
                        taskList.length === 0 ?
                            <div className='fw-bold text-start fs-5' style={{ color: 'blueviolet' }}>No Data Available</div> :
                            taskList.map((item) => {
                                return (
                                    <ToDoLists key={item.id} taskList={item.task} docId={item.id} id={id} getData={getData} />
                                )
                            })
                    }
                </ol>
            </div>
        </div>
    )
}

export default ToDo
