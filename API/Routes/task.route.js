const { Router } = require("express");
const { createNewTask } = require("../Controllers/task.controller");

const taskRouter = Router();

taskRouter.post('/createNewTask' , createNewTask)


//userRouter.post('/createNewUser' ,
    // (req , res) =>createNewUser(req , res)  )

module.exports = taskRouter;