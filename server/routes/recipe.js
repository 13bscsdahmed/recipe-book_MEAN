const express = require('express');
const router = express.Router();
var Recipe = require ('../../models/recipe');


/* GET api listing. */
router.post('/', function(req, res,next) {
  var recipe = new Recipe({
    //content: req.body.content
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
    ingredients: req.body.ingredients

  });

  recipe.save(function (err,result) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'Saved Recipe',
      obj: result
    });
  });

});


router.get('/', function(req,res,next){
  Recipe.find ()
    .exec(function(err, recipes){
      if(err) {
        return res.status(500).json({
          title: 'An error ocurred',
          error: err
        });
      }

      res.status(200).json({
        message: 'Success',
        obj: recipes
      });
    });

});



router.delete('/:id', function (req, res, next){


  Recipe.findById(req.params.id, function (err, recipe) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }

    if(!recipe){
      return res.status(500).json({
        title: 'No Recipe Found',
        error: {message: 'No Message Found'}
      });
    }



    recipe.remove(function (err,result) {

      if (err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }


      res.status(200).json({
        message: 'Deleted recipe',
        obj: result
      });

    });
  });




});




router.patch('/:id', function(req, res) {


  Recipe.findById(req.params.id, function (err, foundrecipe) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }

    if(!foundrecipe){
      return res.status(500).json({
        title: 'No Message Found',
        error: {message: 'No Message Found'}
      });
    }

  foundrecipe.name= req.body.name;
  foundrecipe.description=req.body.description;
  foundrecipe.imagePath=req.body.imagePath;
  foundrecipe.ingredients= req.body.ingredients;

  foundrecipe.save(function (err,result) {

    if (err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }


    res.status(200).json({
      message: 'Updated message',
      obj: result
    });

  });


});
  });



module.exports = router;
