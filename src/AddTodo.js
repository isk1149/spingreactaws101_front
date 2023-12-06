import React, {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import { TextIncrease } from "@mui/icons-material";

const AddTodo = (props) => {
    //사용자의 입력을 저장할 오브젝트
    const [item, setItem] = useState({title:""});
    const addItem = props.addItem;

    //onInputChange 함수 작성
    const onInputChange = (e) => {
        setItem((prevState) => ({
            ...prevState,
            title: e.target.value,
        }));
    }

    const onButtonClick = () => {
        addItem(item); //App.js의 items로 item이 넘어가서 반영이 된거고
        setItem({title:""}); //여기서는 const [item, setItem] = useState({title:""}); 같은 효과를 다시 내는 것
    }

    useEffect(()=>{console.log("AddTodo:",item);},[item]);

    const enterKeyEventHandler = (e) => {
        if (e.key ==='Enter') onButtonClick();
    };

    useEffect(()=>{console.log(item);},[item]);

    //onInputChange 함수 TextField에 연결
    return (
        <Grid container style={{marginTop:20}}>
            <Grid xs={11} md={11} item style={{paddingRight: 16}}>
                <TextField placeholder="Add Todo here" fullWidth onChange={onInputChange} 
                            onKeyDown={enterKeyEventHandler} value={item.title} />
            </Grid>
            <Grid xs={1} md={1} item>
                <Button fullWidth style={{height: "100%"}} color="secondary" variant="outlined" onClick={onButtonClick}>
                    +
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddTodo;