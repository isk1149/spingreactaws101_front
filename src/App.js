import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import {List, Paper, Container} from "@mui/material";
import AddTodo from './AddTodo';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    item.id = "ID-" + items.length;
    item.done = "false";
    setItems([...items, item]);
  };

  const deleteItem = (item) => {
    //삭제할 아이템을 찾는다.
    const newItems = items.filter(e => e.id !== item.id);
    //삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    setItems([...newItems]);
  };

  const editItem = () => {
    setItems([...items]);
  };

  let todoItems = items.length > 0 && 
  (
    <Paper style={{margin: 16}}>
      <List>
        {items.map((item)=> (
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} />
        ))}
      </List>
    </Paper>
  );

  useEffect(()=>{console.log("items: ", items)}, [items]);

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
