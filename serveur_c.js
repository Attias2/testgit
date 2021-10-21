const file  = require('express-fileupload');
const session = require('express-session')

const express = require( 'express' )
const path = require( 'path' )

const port = 4000
const axios = require('axios')
const { json } = require( 'express/lib/response' )
const fs = require( 'fs' )
const mustache = require('mustache')
var mustacheExpress = require('mustache-express');
const { response } = require('express');


const {createConnection, createConnections, Connection}  =  require("typeorm");
const bodyParser = require('body-parser')
const app = express()
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


app.post('/formulaire_photo_souvenir', function(req, res) {
    const photo = req.body.photo;
    const description = req.body.description;
    console.log(req.body)
 // res.send('formulaire_photo_souvenir',{photo, description})
  res.render('formulaire_photo_souvenir',{photo, description})
})

const connect = async () =>{


    try{

        const connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "user"
        });
        connection.query('SELECT * FROM photo_souvenir', function(error, results, field){
            if(error) throw error
            console.log(results)
        })

        
       

        connection.createQueryBuilder().insert().into('photo_souvenir') .values([   { photo:"", description:"" }  ]) .execute();
        
        


    } catch(e){
        console.group(e)
    }    

};
connect();
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

