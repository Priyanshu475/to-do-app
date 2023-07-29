const ToDo = require('../models/to-do-model');

const todo_index = (req, res) => {
  ToDo.find().sort({ createdAt: -1 })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
        });
}

const todo_details = (req, res) => {
  const id = req.params.id;
  ToDo.findById(id)
    .then(result => {
        res.json(result)
        })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}


const todo_create_post = (req, res) => {
  const todo = new ToDo(req.body);
  todo.save()
    .then(result => {
      res.json(result)
      console.log("Todo Added")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

const todo_delete = (req, res) => {
  const id = req.params.id;
    ToDo.findByIdAndDelete(id)
    .then(result => {
      res.json(result)
      console.log("Todo Deleted")
    })
    .catch(err => {
        res.status(400).json({ error: err.message })
    });
}

const todo_update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const updatedTodo = await ToDo.findByIdAndUpdate(id, { title, description, date }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo item not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the todo item' });
  }
};

const todo_duplicate = async (req, res) => {
  try {
    const { id } = req.params;
    const todoToDuplicate = await ToDo.findById(id);
    if (!todoToDuplicate) {
      return res.status(404).json({ error: 'Todo item not found' });
    }

    const duplicatedTodo = { ...todoToDuplicate.toObject() };
    delete duplicatedTodo._id;

    const newTodo = await ToDo.create(duplicatedTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: 'Error duplicating the todo item' });
  }
};



module.exports = {
  todo_index, 
  todo_details, 
  todo_create_post, 
  todo_delete,
  todo_update,
  todo_duplicate
}