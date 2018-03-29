// this API for the database
//encapsulate all CRUD operations in this
//Only database operations happen here

var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server")();
var User = mongoose.model("User", UserSchema); //mongo plurarizes
var pageModel = require("../page/page.model.server");
var widgetModel = require("../widget/widget.model.server");
var websiteModel = require("../website/website.model.server");

 User.createUser = createUser,
  User.findUserById = findUserById,
  User.findUserByCredentials = findUserByCredentials,
  User.deleteUser = deleteUser,
  User.updateUser = updateUser,
  User.findUserByUsername = findUserByUsername;

//findByID returns just one
function findUserById(userId) {
  return User.findById({_id: userId});
}

function findUserByUsername(username) {
  return User.findOne({username: username});
}

function updateUser(userId, user) {
  //ignore _id
  delete user._id;
  return User
    .update({_id: userId}, {
        $set: {
          username : user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    );
}


function deleteUser(userId) {

   websiteModel.find({developerId:userId}).then(function (websites) {
    websites.forEach(function (website) {
      pageModel.find({_website: website._id}).then(function (pages) {
        pages.forEach(function (page) {
          widgetModel.remove({_page: page._id}).exec();
        })
      })
    })
  });

  websiteModel.find({developerId:userId}).then(function (websites) {
    websites.forEach(function (website) {
      pageModel.remove({_website: website._id}).exec();
    })
  });
  websiteModel.remove({developerId: userId}).exec();
  return User.remove({_id: userId});
}

//findOne returns only One (first one for multiple results)
function findUserByCredentials(username, password) {
  return User.findOne({username: username, password: password});

}

function createUser(user) {
  user._id = mongoose.Types.ObjectId();
  return User.create(user);
}

module.exports = User;
