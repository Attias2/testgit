
const express = require( 'express' )
const path = require( 'path' )

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const { parse } = require('path');
const { fstat } = require('fs');
const axios = require('axios');
const file  = require('express-fileupload');
const session = require('express-session');

const port = 3000
const axios = require('axios')
const { json } = require( 'express/lib/response' )
const fs = require( 'fs' )
const mustache = require('mustache')
const {createConnection, createConnections, Connection}  =  require("typeorm");

// const connect = async () =>{

//     try{

//         const connection = await createConnection({
//             type: "mysql",
//             host: "localhost",
//             port: 3306,
//             username: "root",
//             password: "",
//             database: "app_node"
//         });
//     } catch(e){
//         console.group(e)
//     }    

// }


// app.post("/",(req,resp)=>{
//     //insertion d'une donnée
//     const data={photo: req.body.photo, description: req.body.description};
 
// connect.query("INSERT INTO souvenir VALUES",[data],(err,rows,fields)=>{

//             resp.redirect("/");
//         })
//     })
    
// /*
// app.get('/formulaire_photo_souvenir', function (req, res) {
//     res.send('/formulaire_photo_souvenir',{
//         photo: req.body.photo,
//         description: req.body.description
//     })
//   })*/


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

