const { getUserByID } = require("../../src/res/utils");
const TASK_MODEL = require("../Models/taskModel");
const USER_MODEL = require("../Models/userModel");

const createNewUser = (req, res) => {
  const { name, phone, points, pass, email } = req.body;

  USER_MODEL.create({
    name: name,
    phone: phone,
    points: points,
    pass : pass,
    email,
  })
    .then((createRes) => {
      res.status(200).json({ user: createRes._doc });
    })
    .catch((e) =>
      res.status(500).json({ error: true, errorMessage: e.message })
    );
};
const login = async (req, res) => {
  const { phone, pass } = req.body;

  const user = await USER_MODEL.findOne({ phone: phone }).catch((e) =>
    res.status(500).json({ error: true, errorMessage: e.message })
  );

  if (!user) {
    res.status(550).json({ error: true, errorMessage: "no such user" });
    return;
  }

  if (user.pass == req.body.pass) {
    res.status(200).json({ auth: true, user: user });
  } else {
    res.status(545).json({ auth: false, errorMessage: "bad pass" });
  }
};

const updateUser = async (req, res) => {
  const { userID, updatedUser } = req.body;

  var user = await getUserByID(userID);
  //   const userObject = user?.toObject();

  if (!user) {
    res.status(550).json({ error: true, errorMessage: "no such user" });
    return;
  }

    user.name = updatedUser.name || user.name;
    user.phone = updatedUser.phone || user.phone;
    user.pass = updatedUser.pass || user.pass;
    user.points = updatedUser.points || user.points;

    user
      .save()
      .then((saveRes) => res.status(200).json({ user: saveRes?._doc }))
      .catch((e) =>
        res.status(500).json({ error: true, errorMessage: e.message })
      );

    
};



const deleteUser = async (req, res) => {
    const { userID } = req.body;
  
    if (!userID) {
      res.status(400).json({ error: true, errorMessage: "userID is required" });
      return;
    }
    USER_MODEL.findByIdAndDelete(userID)
    .then((deleteRes) => {
      if (!deleteRes) {
        res.status(404).json({ error: true, errorMessage: "user not found" });
      } else {
        TASK_MODEL.deleteMany({ userId: userID })
          .then(() => {
            res.status(200).json({ message: "user and related tasks deleted successfully" });
          })
          .catch((taskErr) => {
            res.status(500).json({ error: true, errorMessage: taskErr.message });
          });
      }
    })
    .catch((e) => {
      res.status(500).json({ error: true, errorMessage: e.message });
    });
};


  const getUser = async (req, res) => {
    const users = await USER_MODEL.find().catch((e) =>
      res.status(500).json({ error: true, errorMessage: e.message })
    );
    res.status(200).json({ message: "successfully"  , users : users});

}



module.exports = {
  login,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,

};