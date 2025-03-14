const express = require("express");

const {renderTodos, completeTodo, deleteTodo} = require("../controllers/TodoController.js")
const router = express.Router();

router.route('/')
    .get(renderTodos)
    .put(completeTodo)
    .delete(deleteTodo)

module.exports = router;