import React, { useContext, useEffect } from 'react'
import '../css/ToDo.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Tooltip, Zoom } from '@mui/material';
import ToDoLists from './ToDoLists';
import TaskContext from '../context/tasks/TaskContext';
import TaskCompleted from './TaskCompleted';
import { Toaster } from 'react-hot-toast';

const ToDo = () => {

    const { addTask, handleTask, getData, task, setTask, taskList, completedTaskLength, remainingTaskLength } = useContext(TaskContext);

    useEffect(() => {
        getData()
        completedTaskLength()
        remainingTaskLength()
        // eslint-disable-next-line
    }, []);

    return (
        <div className='main_div d-flex flex-column align-items-center justify-content-center text-center'>
            <div className='center_div pt-3 bg-white mb-5 mt-4'>
                <div className='center_top'>
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
                </div>

                <div className='center_bottom'>
                    <ol className='mt-3'>
                        {
                            taskList.length === 0 ?
                                <div className='fw-bold text-start fs-5' style={{ color: 'blueviolet' }}>No Data Available</div> :
                                taskList.map((item) => {
                                    return (
                                        <ToDoLists key={item.id} status={item.completed} taskList={item.task} docId={item.id} />
                                    )
                                })
                        }
                    </ol>
                </div>
            </div>
            <Toaster />
            <TaskCompleted />
        </div>
    )
}

export default ToDo
