module.exports = function (app) {

  app.put("/api/user/:userId", updateUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user/:username", findUserByUsername);
  app.get("/api/user", findUserByCredentials);
  app.post("/api/user", createUser);
  app.delete("/api/user/:userId", deleteUser);
  var userModel = require("../model/user/user.model.server");


  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId).then(function (user) {
      res.status(200);
    })
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function (user) {
        res.json(user);
      })
  }

  function findUserByUsername(req, res) {
    var username = req.params["username"];
    if (username) {
      userModel.findUserByUsername(username).then(function (user) {
        res.json(user);
      });
    }
  }

  function findUserById(req, res) {
    var userId = req.params["userId"]
    userModel.findUserById(userId).then(function (user) {
      res.json(user);
    })
  }


  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function (user) {
        res.json(user);
        //console.log(user);
      })
      return;
    }
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel.updateUser(userId, user).then(function(user){
      res.send(user);
    });
  }
}
