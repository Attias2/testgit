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
const files  = require('express-fileupload');

const {createConnection, createConnections, Connection, getConnection}  =  require("typeorm");
const bodyParser = require('body-parser')
const app = express()
//const fileUpload = require('../lib/index');
app.use('/',express.static("formulaire_photo_souvenir"))
//app.use(files());
//app.use('/formulaire_photo_souvenir', express.static(__dirname + '/formulaire_photo_souvenir.mustache'));
app.use(files({
 // limits: { fileSize: 50 * 1024 * 1024 },
 useTempFiles : true,
  tempFileDir : '/tmp/'

}));



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


app.get("/formulaire_photo_souvenir", function(req, res) {

    console.log(afficher().then(function(e){console.log(e)}),1)
    const connectionc = getConnection()
   
   connectionc.query('SELECT * FROM photo_souvenir', function(error, results, field){
   // console.log(results)
    let affiche =results
    /*
    for (let index = 0; index < results.length; index++) {
        affiche = affiche +`<div>
        <img src="${results[index].photo}">
        ${results[index].description}
        </div>`;
       
    }*/
    
    console.log(affiche,"apres")
    res.render("formulaire_photo_souvenir",{results});
    

    
} );

})


// enctype="multipart/form-data"
app.post('/formulaire_photo_souvenir', function(req, res) {
  const photo = req.files.photo
  const nomPhoto = photo.name.substring(0, photo.name.length - 5)
  
  // console.log(photo1,'photo')
   //console.log(photo2)
   
   /* req.files.*/photo.mv("./views/"+nomPhoto+"x.jpg", function(err) {
        if (err)
         return res.status(500).send(err);
       
        res.send(err);
       });

    const  photo2 = nomPhoto+"x.jpg"
    const description = req.body.description
    connect(photo2, description)/**/
    res.redirect("/formulaire_photo_souvenir")

    //res.render("/formulaire_photo_souvenir",{afficher:afficher()})
    const connection3 = getConnection()
   
   connection3.query('SELECT * FROM photo_souvenir', function(error, results, field){
    //console.log(results[0].id)
    let affiche = bloc
    
    for (let index = 0; index < results.length; index++) {
        affiche = affiche +`<div>
        <img src="${results[index].description}">
        ${results[index].description}
        </div>`;
       
    }
    affiche = affiche+`
    </div>
    
    
    </body>
    
    
    </html>`;

  /* res.writeHead("Content-Type", "text/html");
    res.write(affiche);
   res.end()*/
  //return res.render('formulaire_photo_souvenir',{afficher:results})
})


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




    const connectionc = getConnection()
   
   connectionc.query('SELECT * FROM photo_souvenir', function(error, results, field){
   // console.log(results)
    let affiche = bloc
    
    for (let index = 0; index < results.length; index++) {
        affiche = affiche +`<div>
        <img src="${results[index].photo}">
        ${results[index].description}
        </div>`;
       
    }
    affiche = affiche+`
    </div>
    
    
    </body>
    
    
    </html>`;
    console.log(affiche,"apres")
  /*  app.get("/formulaire_photo_souvenir", function(req, res) {

        console.log(affiche)
        res.render("formulaire_photo_souvenir",{afficher:affiche});
        
    
        
    } );*/
   //res.writeHead(200, {"Content-Type": "text/html"});
   //res.write();
  //res.end(affiche)
})

/*
app.get("/formulaire_photo_souvenir", function(req, res) {

  res.render('formulaire_photo_souvenir',{/*photo, description,affiche})

})*/

    
 //return affiche


};

let bloc =
`
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
  <style>
  .cphoto{
   display: flex;
      flex-direction: column;
      justify-content: space-around;
  }
  
  </style>
  </head>
<body>
 


<form id="form" action="formulaire_photo_souvenir" method="post" enctype="multipart/form-data">
 
   <fieldset>

<legend>Formulaire Photo souvenir</legend>

    

<label for="photo">Photo:</label>
<input type="file" name="photo" id="photo" />


<label for="description">Description:</label>
<input type="text" id="description" name="description"/>
   </fieldset>



<button type="submit" id="button" >Enregister</button>


</form>


<div class="cphoto">
`;

/*</div>
<div>
        <img src="{{results[index].description}}">
        {{description}}
        </div> */

//afficher()
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
//     //insertion d'une donn??e
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

