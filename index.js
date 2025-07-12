// // const express = require('express');
// const app = express();
// const port  = 8080;

// app.get('/home',(req,res)=>{

// })
// app.listen(port,()=>{
//     console.log(`server is running on port ${port}`);
// })
// const obj = [
//   { name: "yogesh", key: 1 },
//   { name: "aashish", key: 2 },
//   { name: "ankur", key: 3 },
//   { name: "jai", key: 4 },
//   { name: "shviam", key: 5 },
//   { name: "himanshu", key: 6 },
//   { name: "arpit", key: 7 },
//   { name: "pankaj", key: 8 },
// ];
// let newObj = obj.find((item)=>item.key != 8)

// console.log(newObj);
// let arr = [5,1,7,{a : 2,b : 4},6];
// let a = arr.filter((item,idx)=>idx != 3);
// console.log(a);

// let str = "abcdefghijklmnopqabcedrstuvwxyz";
// let a = "aeiou";
// let c = 0;
// for(let i of str){
//     if(a.includes(i))
//         c++;
// }
// console.log(c)
// let text = "The rain in hello SPAIN stays mainly in the plain";
// let res =text.includes("");
// console.log(res)
// let m = Math.max(5,3,1,8,9);
// console.log(m);
// let c ="";
// if(c){
//     console.log("cc");
//    }
// else{
//     console.log("acc");
// const cookieParser = require('cookie-parser');
// app.use(cookieParser("hello world"));
// app.get('/listen',(req,res)=>{
//     res.cookie("cookie_name","12345",{signed : true});
//     res.send("hi ,yogesh")
// })

// app.get('/send',(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("hi shishir")
// })
// const express = require('express')
// const app = express();
// const session = require('express-session');
// const flash = require('connect-flash');
// const sessionOption = {secret : 'my super secret',
//     resave  : false,
//     saveUninitialized : true,
//     cookie : {
//         expires : Data.now()+7*24*60*60*1000,
//         maxAge  : 7*24*60*60*1000,
//         httpOnly  :true
//     }
// };

// app.use(session(sessionOption));
// app.use(flash()); 
// app.get('/register',(req,res)=>{
//     const {name='anonomoyus'} = req.query;
//     req.session.name = name;
//     req.flash("info","this is message comming from flash");
//     res.send(`hi ${name}`);
// })
// app.get('/hello',(req,res)=>{
//     console.log();
//     // res.send(`hello,${req.session.name}`)
//     res.locals.msg = req.flash('info');
//     res.render("flash.ejs")
// })


// app.listen(8080,()=>console.log('express is running'));

//  const data = {name : 'yogesh',age : 30};
//  const user = {...data};
const data = [1,2,3,4,6];
const user = [...data]
 console.log(user)