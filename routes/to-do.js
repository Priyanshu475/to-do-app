const router = require('express').Router();

const todocontroller = require('../controllers/todocontroller');


router.get('/', todocontroller.todo_index);
router.post('/create', todocontroller.todo_create_post);
router.delete('/:id', todocontroller.todo_delete);
router.put('/:id',todocontroller.todo_update);
router.post('/duplicate/:id',todocontroller.todo_duplicate);

module.exports = router;