import React, { useEffect, useState } from 'react';
import './App.css';
import ToDoLists from './ToDoLists';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import db from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

const App = () => {

  const [inputList, setInputList] = useState("");
  const [list, setList] = useState([]);

  async function getLists() {
    const listsCol = collection(db, 'list');
    const listSnapshot = await getDocs(listsCol);
    const List = listSnapshot.docs.map(doc => ({ id: doc.id, doc: doc.data() }));
    setList(List);
  }

  useEffect(() => {
    getLists();
  }, [list]);

  const addItems = () => {
    if (inputList.length === 0) {
      window.alert("Please Add Item.");
    } else {
      addDoc(collection(db, 'list'), {
        item: inputList
      });
      setInputList("")
    }
  }

  return (
    <div className="main_div">
      <div className="center_div">
        <h1>ToDo List</h1>
        <div className="add_iteam">
          <input type="text" placeholder="Add a Items" onKeyPress={(e) => {if(e.key === "Enter") {addItems}}} value={inputList} onChange={(e) => { setInputList(e.target.value) }} />
          <input type="text" placeholder="Add a Items" onKeyPress={(e) => {if(e.key === "Enter") {addItems}}} value={inputList} onChange={(e) => { setInputList(e.target.value) }} />
          <AddCircleOutlineOutlinedIcon className='add' onClick={addItems} />
        </div>

        <ol>
          {
            list && list.map((items) => {
              return (
                <ToDoLists key={items.id} itemList={items.doc.item} id={items.id} />
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default App;