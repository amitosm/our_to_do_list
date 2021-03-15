//create the app
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// template set
app.set('views', './views')
app.set('view engine', 'ejs')

//static files
//we failed to make external JS file for home page.
app.use('/css', express.static(path.join(__dirname, "/public/css")));

//array of jsons will be our database
//every restart of the server will delete all data.
//the id count will keep track of the id 
let data = []
let id_count = 0;


//listen on port 3000
app.listen(process.env.PORT || port);

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
  //when adding a new task this function will handle the data 
  // and will render the home page with updated data.
  let task = req.body.task;
  let description = req.body.description;
  let id = id_count
  id_count += 1
  data.push({ id: id, task: task, description: description })
  res.redirect('/');

})

app.get('/update/:id', function (req, res) {
  let id_to_update = parseInt(req.params.id);
  // render to update.ejs
  let taskToUpdate = 0;
  data.forEach(x => {
    if (x.id == id_to_update) {
      taskToUpdate = x;
    };
  });

  res.render('update', {
    title: 'Edit Task',
    id: id_to_update,
    task: taskToUpdate.task,
    description: taskToUpdate.description
  })
})

// update task data
app.post('/update/:id', function (req, res) {
  let id = req.params.id;
  let task = req.body.task;
  let description = req.body.description;

  for (let i = 0; i < data.length; ++i) {
    if (data[i].id == id) {
      data[i] = { id: id, task: task, description: description };
      break;
    }
  }

  res.redirect('/');
})

app.get('/delete/(:id)', function (req, res) {

  let id = req.params.id;
  if (data.length == 1) {
    data.splice(0, 1);
  } else {
    if (data.length > 0) {
      data.splice(id, 1);
      if (id_count > 0) {
        --id_count;
      }
    }
  }

  res.redirect('/');
})

