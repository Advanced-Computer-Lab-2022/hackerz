const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
//app.use(cookieParser());
const requireAuthadmin = (req, res, next) => {
  const token = req.cookies.jwt;
    
  // check json web token exists & is verified
  if (token) {
     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userinfo) => {
      if (err) {
       // res.redirect(' http://localhost:3000/home');
        res.json({message:"Unauthorised"})
        //res.redirect('./routes/home');
       // response.end();
    
      } else {
        if(userinfo.usertype != "admin"){
          //res.redirect(' http://localhost:3000/home');
          res.json({message:"Unauthorised"})
          
         // res.redirect('./routes/home');
          //response.end();
        }
        else{ 
          
          next();}
        //console.log(decodedToken);
        //const type = decodedtoken.type;

       // next();
      }
    });
  } else {
  //  res.redirect(' http://localhost:3000/home');
    res.json({message:"Unauthorised"})
   // response.end();
    
  
  }
};
const requireAuthinstructor = (req, res, next) => {
    const token = req.cookies.jwt;
      
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userinfo) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"Unauthorised"})
          // res.redirect('/login');
        } else {
          if(userinfo.usertype != "instructor"){
            res.status(401).json({message:"Unauthorised"})
          }
          else{ next();}
          //console.log(decodedToken);
          //const type = decodedtoken.type;
  
         // next();
        }
      });
    } else {
      res.status(401).json({message:"Unauthorised"})
    }
  };

  const requireAuthindividualTrainee = (req, res, next) => {
    const token = req.cookies.jwt;
      
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userinfo) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"Unauthorised"})
          // res.redirect('/login');
        } else {
          if(userinfo.usertype != 'individualTrainee'){
              res.status(401).json({message:"Unauthorised"})
          }
          else{ next();}
          //console.log(decodedToken);
          //const type = decodedtoken.type;
  
         // next();
        }
      });
    } else {
      res.status(401).json({message:"Unauthorised"})
    }
  };

  const requireAuthcorpTrainee = (req, res, next) => {
    const token = req.cookies.jwt;
      
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userinfo) => {
        if (err) {
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"Unauthorised"})
          // res.redirect('/login');
        } else {
          if(userinfo.usertype != 'corpTrainee'){
              res.status(401).json({message:"Unauthorised"})
          }
          else{ next();}
          //console.log(decodedToken);
          //const type = decodedtoken.type;
  
         // next();
        }
      });
    } else {
      res.status(401).json({message:"Unauthorised"})
    }
  };

module.exports = { requireAuthadmin ,requireAuthinstructor, requireAuthindividualTrainee , requireAuthcorpTrainee };