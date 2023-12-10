import React from 'react'
import { signup } from './service/ApiService'
import { Container, Grid, Typography, TextField, Button } from '@mui/material'
import {Link} from "react-router-dom"

export default function SignUp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        //오브젝트에서 form에 저장된 데이터를 앱의 형태로 바꿔줌.
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({userName: username, email:email, password: password}).then(
            (response) => {
                //계정 생성 성공 시 login페이지로 리디렉트
                window.location.href="/login";
            }
        );
    }

    return (
    <>
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            계정생성
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="frame"
                            name="usernmae"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="사용자이름"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            계정생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            이미 계정이 있습니까? 로그인하세요.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </>
    )
}