//installing Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

//importing json
let data = require('./client.json')
const { royalblue } = require('color-name')
//running express
const app = express()

//using cors
app.use(cors())

//configuring body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/client', (req, res) => {
    //adding a client
    const client = req.body;
    data.push(client);
    // fs.writeFileSync("./clients.json", client);

    //console.log(client);
    res.send('client has been added');

});

//loading all clients
app.get('/loadclient', (req, res)=>{
    res.json(data)
    //console.log('Clients have been Loaded')
})

//delete a client
app.delete('/client/:id', (req, res) => {
    //const clientId = req.body
    //console.log(clientId)
    const query = req.params.id;
    console.log(query)
    console.log(data)
    data = data.filter(i => i.id !== query)
    res.send("client has been deleted")
    console.log("client has been deleted")


})


//editlient
app.get('/client/editclient/:id', (req, res)=> {
 const deleteQuery = req.params.id;
    const updateData = data.filter(i => 
        i.id === deleteQuery)
    res.send(updateData)
})

//updating a client
app.put('/client/updateclient/:id', (req, res) => {

    const found = data.findIndex(obj => obj.id === req.params.id)
    data[found].Name.firstName = req.body.firstName;
    data[found].Name.lastName = req.body.lastName;
    data[found].role = req.body.role;
    data[found].department = req.body.department;

})




const port = process.env.port || 3000

app.listen(port, ()=> {
    console.log(`App is running on ${port}`);
})