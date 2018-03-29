module.exports = function () {
  var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

  var WidgetSchema = mongoose.Schema ({
    _page : {type : mongoose.Schema.ObjectId, ref: "Page"},
    widgetType: {type: String, enum: ['Heading', 'Image', 'Youtube', 'Html', 'Text']} ,
    name : {type : String},
    text : String,
    placeholder : String,
    description : String,
    url : String,
    width : String,
    height: Number,
    rows : Number,
    size : Number,
    class : String,
    icon : String,
    formatted: Boolean,
    position: Number,
    dateCreated : {type: Date, default : Date.now} //Date.now is the current time
  }, {collection: "assignment.widget" });

  return WidgetSchema;
};
