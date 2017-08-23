var mongoose= require('mongoose');
var Schema= mongoose.Schema;


var schema= new Schema({
  name: {type: String, required:true},
  description:{type: String, required:true},
  imagePath:{type: String, required:true},
  ingredients: [{
    name:{type:String, required:true},
    amount:{type: Number, required:true}
  }]

});



module.exports= mongoose.model('recipe', schema); //collection will be called users
