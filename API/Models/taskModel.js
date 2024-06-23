const { Schema, model, models } = require("mongoose");

const taskSchema = new Schema({
  nameTask: String,
  userId:{
    type: String,
  
  },
  startTime: {
    type: String,
  },
  endTime:{
    type: String,

  },
  description:{
    type: String,
  },
  alert:{
    type: [Date],
  },
});


const TASK_MODEL = models.task || model("task", taskSchema);

module.exports = TASK_MODEL;
