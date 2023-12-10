import React from 'react';
import './index.css';
import App from './App';
import {Login} from './Login';
import  SignUp  from './SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const CopyRight = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

/** react-router-dom 라이브러리
 * BrowserRouter - 브라우저가 관리하는 히스토리를 사용해 브라우저와 리액트 사이의 url을 동기화해서 뒤로가기 버튼 지원함
 * <Routes> - 여러 개의 Route를 관리하고 적합한 Route를 찾아준다
 * <Route> - 실제 경로를 지정해주기 위한 컴포넌트
 */

export const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <CopyRight />
            </Box>
        </div>
    );
};