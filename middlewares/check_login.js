
require('dotenv').config()



const verifyUser = async(req, res, next) => {
  
    try {
        
        if(req.session.isLogin) {
            next();
        } else {
            res.redirect('/login');
        }
        
   
    } catch (error) {
       
    }
};

module.exports =verifyUser;