require("dotenv").config();
const express = require("express");
const {json} = require("body-parser");
const session = require("express-session");
const {checkForSession}  = require("./middlewares/checkForSession")
const {read} = require("./controllers/swag_controller");
const {login,register,signout,getUser} = require("./controllers/auth_controller");
const {add,remove,checkout} = require("./controllers/cart_controller");
const {search} = require("./controllers/search_controller");

const app = express();
app.use(json());
app.use(session({
    cookie:{
        maxAge:10000
    },
    saveUninitialized:true,
    resave:false,
    secret:process.env.SECRET
}))
app.use(checkForSession);

app.use(express.static(__dirname+"/../build"))

app.get("/api/swag",read);
app.post("/api/login",login);
app.post("/api/register",register);
app.post("/api/signout",signout);
app.get("/api/user",getUser);
app.post("/api/cart",add)
app.post("/api/cart/checkout",checkout)
app.delete("/api/cart",remove);
app.get("/api/search",search);





app.listen(process.env.PORT || 3001,()=>{
    console.log("Listening on port: "+process.env.PORT)
})