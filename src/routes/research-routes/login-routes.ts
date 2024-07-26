import { loginController } from '$controller/research/login-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const loginRoutes = Router();

loginRoutes.post('/verify-login',asyncErrorHandler(loginController))

export default loginRoutes;