var User = require('../models/user');
  
//--------------Profile & Settings----------------
exports.update_profile = function(req, res){
  console.log(req.body);
   // var User = mongoose.model('user', userSchema);
    if (req.body.password != null){
      User.findOneAndUpdate({ email: req.body.email }, { 
          email : req.body.email,
          password : req.body.password,
          fname : req.body.fname,
          lname : req.body.lname,
          cname : req.body.cname,
          title : req.body.title,
          country : req.body.country,
          city : req.body.city,
          vatid : req.body.vatid,
          currency : req.body.currency,
          bio : req.body.bio
          }, function(err, user) {
            if (err) throw err;
            res.send("success");
                  console.log(user);
          });
    }
    else{
      User.findOneAndUpdate({ email: req.body.email }, { 
          email : req.body.email,
          fname : req.body.fname,
          lname : req.body.lname,
          cname : req.body.cname,
          title : req.body.title,
          country : req.body.country,
          city : req.body.city,
          vatid : req.body.vatid,
          currency : req.body.currency,
          bio : req.body.bio
          }, function(err, user) {
            if (err) throw err;
            res.send("success");
                  console.log(user);
          });     
    }
}  
    
/** PROFILE PHOTO **/
  exports.upload_pic = function(req, res){
    photoUpload(req, res, './public/uploads/user/', function(err) {
        if(err) {
            return res.end(toString(err));
        }
    });
  }

