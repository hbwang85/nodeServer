# nodeServer

This is the sample for learning nodeJS开发指南. In this sample I used express 4.x instead of express2.x and resolve many issues on the updated express.  
1. dynamicHelpers is deprecated on express 4.x, should use app.use instead;  
2. flash is a migic for express 2.x, however, it is also deprecated on express 4.x, I tried to use req.session instead firstly, however, it failed. So I used "connect-flash", just leave this issue there;  
3. layout.ejs for views is deprecated and it is discouraged to be used.

