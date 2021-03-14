//create the app
const express = require('express')
const app = express()
const port = 3000
// const router =express.Router()
var path = require('path');

// template set
app.set('views', './views')
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//array of jsons will be our database
let data = [{ "id": 0, "task": "Add tasks to the list", "description": "Add tasks to the list by pressing the add task button" }]
let id_count = 0;


//listen on port 3000
app.listen(port, () => console.log(`listning on port ${port}`))

app.get('/', function (req, res) {

  // render to views/home.ejs with all data
  res.render('home', { data });

});

app.get('/add', function (req, res) {
  // render to add.ejs where you can add a task
  res.render('add', {
    task: '',
    description: ''
  })
})

app.post('/add', function (req, res) {
  let task = req.body.task;
  let description = req.body.description;
  let id = id_count
  id_count += 1
  data.push({ id: id, task: task, description: description })
  console.log(data);
  res.redirect('/');

})

app.get('/update/:id', function (req, res) {
  let id_to_update = parseInt(req.params.id);
  // render to update.ejs
  res.render('update', {
    title: 'Edit Book',
    id: id_to_update,
    task: data[id_to_update].task,
    description: data[id_to_update].description
  })
})

// update task data
app.post('/update/:id', function (req, res) {
  let id = req.params.id;
  let task = req.body.task;
  let description = req.body.description;

  data[id] = { id: id, task: task, description: description }

  res.redirect('/');
})

app.get('/delete/(:id)', function (req, res) {

  let id = req.params.id;
  data.splice(id, 1);

  if (id_count > 0) {
    --id_count;
  }
  res.redirect('/');
})

