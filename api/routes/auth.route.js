import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const authsRoute = express.Router();


authsRoute.post('/login', login)

authsRoute.post('/register', register)

export default authsRoute