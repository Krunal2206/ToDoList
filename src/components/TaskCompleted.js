import React, { useContext } from 'react'
import TaskContext from '../context/tasks/TaskContext';

const TaskCompleted = () => {

    const { taskList, remainingTask, completedTask } = useContext(TaskContext);

    return (
        <table className="table text-white table-bordered" style={{ width: '70%' }}>
            <thead>
                <tr>
                    <th scope="col">Total Tasks</th>
                    <th scope="col">Remaining Tasks</th>
                    <th scope="col">Completed Tasks</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{taskList.length}</td>
                    <td>{remainingTask}</td>
                    <td>{completedTask}</td>
                </tr>
            </tbody>
        </table >
    )
}

export default TaskCompleted
