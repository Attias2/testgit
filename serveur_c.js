const session = require('express-session')

const express = require( 'express' )
const path = require( 'path' )

const port = 4000
const axios = require('axios')
const { json, get } = require( 'express/lib/response' )
const fs = require( 'fs' )
const mustache = require('mustache')
var mustacheExpress = require('mustache-express');
const { response } = require('express');
const mv = require('mv');

const {createConnection, createConnections, Connection, getConnection}  =  require("typeorm");
const bodyParser = require('body-parser')
const app = express()
//const fileUpload = require('../lib/index');

//app.use(file());
const file  = require('express-fileupload');

app.use(file({
 // limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'

}));

app.use('/',express.static("d1"))

app.engine('mustache', mustacheExpress());
app.set('view engine','mustache');
app.set('Views',__dirname +  '/views');

app.set('trust proxy',1);
app.use(session({
    saveUninitialized: true,
    secret:'Webtech',
    resave:true,
    cookie:{
        secure:false,
        expires:false,
        maxAge:30 * 24 * 60 * 60 * 1000
    }
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
/**/
app.get("/formulaire_photo_souvenir", function(req, res) {
 
    res.render("formulaire_photo_souvenir");

    
} );
//console.log(file)
// enctype="multipart/form-data"
app.post('/formulaire_photo_souvenir', function(req, res) {
    const photo = req.body.photo
    const description = req.body.description
   //console.log(req.body.photo,'photo')
    /*req.file.photo.mv("./d1/views/"+photo+"img.jpg", function(err) {
        if (err)
         return res.status(500).send(err);
       
        res.send(err);
       });*/

    connect(photo, description)
   const tab = afficher()

  res.render('formulaire_photo_souvenir',{photo, description})
  
})

const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "user"
})

const connect = async (d,s) =>{

       let connection2 = getConnection()
      /*connection2.query('SELECT * FROM photo_souvenir', function(error, results, field){
            if(error) throw error
            console.log(results)
        })*/

        connection2.createQueryBuilder().insert().into('photo_souvenir') .values([   { photo:d, description:s }  ]) .execute();    

};
const afficher = async () =>{

    let connection3 = getConnection()
  return connection3.query('SELECT * FROM photo_souvenir', function(error, results, field){
    console.log(results[0])
    
    })


    
};




//connect();
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

