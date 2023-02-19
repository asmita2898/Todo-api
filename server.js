const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const url = process.env.MONGO_URL
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=> console.log("Database connected"))
.catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async(req, res) => {
    
    const todo = await Todo.find();
    res.json(todo);
  })

  app.post('/todo/new',(req, res)=>{
    const todo = new Todo({
      text:req.body.text
    });
    todo.save();
    res.json(todo);
  });

  app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({result});
  });
  
  app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;  
    todo.save();
    res.json(todo);
  })
  
  app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
    todo.save();
    res.json(todo);
  });

  //static files
  // app.use(express.static(path.join(__dirname, './client/build')))
  // app.get('*',)
const port = process.env.PORT || 8000;
app.listen(8000, ()=> console.log("Server started on 8000"));

