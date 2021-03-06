import React from 'react';
import './ToDoLists.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { deleteDoc, doc } from 'firebase/firestore/lite';
import db from './firebase';

export const ToDoLists = ({ itemList, id }) => {

    const removeItem = () => {
        let result = window.confirm("Are you sure for remove item?");
        if (result) {
            deleteDoc(doc(db, 'list', id));
        }
    }

    return (
        <div className="todo_style">
            <CancelOutlinedIcon className='remove' onClick={removeItem} />
            <li>{itemList}</li>
        </div>
    )
}

export default ToDoLists;