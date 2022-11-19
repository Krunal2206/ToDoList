import React, { useContext } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import '../css/ToDoLists.css';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import db from '../firebase';
import { Tooltip, Zoom } from '@mui/material';
import TaskContext from '../context/tasks/TaskContext';

const ToDoLists = ({ status, taskList, docId }) => {

    const { getData, user, completedTaskLength, remainingTaskLength, applyToast } = useContext(TaskContext);

    const removeItem = async () => {
        let result = window.confirm("Are you sure for remove item?");
        if (result) {
            await deleteDoc(doc(db, 'users', user.uid, 'list', docId));
            getData()
            completedTaskLength()
            remainingTaskLength()
            applyToast('Task Removed Successfully!')
        }
    }

    const updateItem = async () => {
        await updateDoc(doc(db, 'users', user.uid, 'list', docId), {
            completed: true
        });
        getData()
        completedTaskLength()
        remainingTaskLength()
    }

    return (
        <>
            <div className="d-flex align-items-center gap-3">
                <Tooltip title='Remove' placement="bottom" TransitionComponent={Zoom} arrow>
                    <CancelOutlinedIcon className='removeBtn rounded-circle' role="button" onClick={removeItem} />
                </Tooltip>
                <li className={`d-flex align-items-center text-capitalize ${status ? 'text-decoration-line-through' : null}`} role="button" onClick={updateItem}>{taskList}</li>
            </div>
        </>
    )
}

export default ToDoLists
