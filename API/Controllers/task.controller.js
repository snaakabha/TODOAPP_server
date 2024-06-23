const TASK_MODEL = require("../Models/taskModel");



const createNewTask = (req, res) => {
    const { nameTask,startTime, endTime, description, alert,userId } = req.body;
    TASK_MODEL.create({
        nameTask:nameTask,
        startTime,
        endTime,
        description,
        alert,
        userId,
     
      })
        .then((createRes) => {
          res.status(200).json({ user: createRes._doc });
        })
        .catch((e) =>
          res.status(500).json({ error: true, errorMessage: e.message })
        );
}

const updateTask = async (req, res) => {
  const { TaskId,userId, nameTask,startTime, endTime, description,alert} = req.body;

  try {
    const updatedTask = await TASK_MODEL.findByIdAndUpdate(
        taskId,
        { nameTask, startTime, endTime, description, alert },
        { new: true, runValidators: true }
    );

    if (!updatedTask) {
        return res.status(404).json({ error: true, errorMessage: "Task not found" });
    }

    res.status(200).json({ task: updatedTask });
} catch (e) {
    res.status(500).json({ error: true, errorMessage: e.message });
}
};
  



module.exports = {
  createNewTask,  

};