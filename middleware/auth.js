const { validateToken } = require("../service/authentication")

function checkForAuthenticationCookie(cookiename){             //taking cookie as parameter
    return (req, res, next)=>{
        const tokenCookieValue = req.cookies[cookiename]        // fetching cookies from request
        // console.log(req)
        
        if(!tokenCookieValue){
         
            return next()
         }
         try {
            const userPayload = validateToken(tokenCookieValue)     //validating cookie to extract the encrypted payload
        
            req.user = userPayload                                      // forwarding the payload as req.user
             
         } catch (error) {
        }
        return next(); 
    }
}

module.exports= checkForAuthenticationCookie                    //exporting the module
 