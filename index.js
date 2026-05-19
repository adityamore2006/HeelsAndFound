require('dotenv').config();
const cors = require('cors');
const express = require("express")
const mongoose = require('mongoose');
const Item = require("./models/product.model.js");
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//return homepage
app.get('/', (req, res) => {
    res.send("Hello from Node API");
})

//return all items (optionally filtered by type: found|lost)
app.get('/api/items', async (req,res) => {
  try {
    const filter = {};
    if (req.query.type === 'found' || req.query.type === 'lost') {
      filter.type = req.query.type;
    }
    const items = await Item.find(filter);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//return a single item
app.get('/api/items/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// create an item
app.post('/api/items', async (req,res) => {
    try {
      const item = await Item.create(req.body)
      res.status(200).json(item);
  } catch (error){
    res.status(500).json({message: error.message});
  }
})

//update an item
app.put('/api/items/:id', async(req,res) => {
  try {
    const {id} = req.params;

    const item = await Item.findByIdAndUpdate(id, req.body)

    if(!item) {
      return res.status(404).json({message: "Item not found"})
    }

    const updatedItem = await Item.findById(id);
    res.status(200).json(updatedItem);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// delete an item
app.delete('/api/items/:id', async(req,res) => {
  try {
    const {id} = req.params;

    const item = await Item.findByIdAndDelete(id)

    if(!item) {
      return res.status(404).json({message: "Item not found"})
    }

    res.status(200).json({message: "Item deleted successfully"});

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
  }).catch((error) => {
    console.log("Failed to connect to database:", error.message)
  })
