import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import adminRouter from './router/adminRouter.js';
import uploadRouter from './router/uploadRouter.js';

// 서버 생성 및 포트 지정
const server = express();
const port = 9000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());

// 미들웨어
server.use('/admin', adminRouter);
server.use('/upload', uploadRouter);

// 서버 실행
server.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
});