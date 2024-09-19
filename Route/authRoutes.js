
import {login,signup} from '../Controllers/userController.js'
import { Router } from "express";

const route = Router()


route.post('/register', signup)
route.post('/login', login)

export default route

