import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import '../css/ToDoLists.css';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import db from '../firebase';
import { Tooltip, Zoom } from '@mui/material';

const ToDoLists = ({ taskList, docId, id, getData }) => {

    const [complete, setComplete] = useState(false);

    const removeItem = async () => {
        let result = window.confirm("Are you sure for remove item?");
        if (result) {
            await deleteDoc(doc(db, 'users', id, 'list', docId));
            getData()
        }
    }

    return (
        <div className="d-flex align-items-center gap-3">
            <Tooltip title='Remove' placement="bottom" TransitionComponent={Zoom} arrow>
                <CancelOutlinedIcon className='removeBtn rounded-circle' role="button" onClick={removeItem} />
            </Tooltip>
            <li className={`d-flex align-items-center text-capitalize ${complete ? 'text-decoration-line-through' : null}`} role="button" onClick={() => setComplete(true)}>{taskList}</li>
        </div>
    )
}

export default ToDoLists
