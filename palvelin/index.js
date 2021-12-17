const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

// mongo here...

const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://<username>:<password>@democluster.zrime.mongodb.net/palautedb?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

// Mongoose Scheema and Model here...

// scheema
const palauteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    name: { type: String, required: true }, 
    title:{ type: String, required: true}, 
    date: { type: String, required: true} 
  })
  
// model
const Palaute = mongoose.model('Palaute', palauteSchema, 'palautteet')
  
// Routes here...
app.post('/palautteet', async (request, response) => {
    const { text } = request.body
    const { name } = request.body 
    const { puisto } = request.body 
    const { date } = request.body 
    const palaute = new Palaute({
      text: text,
      name: name, 
      title: puisto, 
      date: date    
    })
    const savedPalaute = await palaute.save()
    response.json(savedPalaute)  
  })



// palautteet-route
app.get('/palautteet', async (request, response) => {
    const palautteet = await Palaute.find({})
    response.json(palautteet)
  })

  app.get('/palautteet/:id', async (request, response) => {
    const palaute = await Palaute.findById(request.params.id)
    if (palaute) response.json(palaute)
    else response.status(404).end()
  })

  app.delete('/palautteet/:id', async (request, response) => {
    const deletedPalaute = await Palaute.findByIdAndRemove(request.params.id)
    if (deletedPalaute) response.json(deletedPalaute) 
    else response.status(404).end()
  })

// app listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})