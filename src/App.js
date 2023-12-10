import './App.css';
import Todo from './Todo';
import React, {useState, useEffect} from "react";
import {List, Paper, Container, Typography, Grid, Button, AppBar, Toolbar} from "@mui/material";
import AddTodo from './AddTodo';
import {call} from './service/ApiService';
import { signout } from './service/ApiService';


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ //useEffect 덕분에 무한로딩을 막을 수 있음
    call("/todo", "GET", null)
    .then(response => {
      setItems(response.data)
      setLoading(false);
    })},[]);

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then(response => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then(response => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then(response => setItems(response.data));
  };

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">
              오늘의 할일
            </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

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

  //useEffect(()=>{console.log("items: ", items)}, [items]);

  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );

  let loadingPage = <h1>로딩중...</h1>;
  let content = loadingPage;

  if (!loading) {
    //로딩중이 아니라면 todoListPage를 선택
    content = todoListPage;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
