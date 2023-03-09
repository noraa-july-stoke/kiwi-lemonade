const Todo = require('../models/todo')

const findAll = async (ctx) => {
    const todos = await Todo.find({})
    ctx.body = todos
}

const create = async (ctx) => {
    const newTodo = new Todo(ctx.request.body)
    ctx.body = savedTodo
}

const update = async (ctx) => {
    const id = ctx.params.id
    const todo = await Todo.findById(id)
    todo.done = !todo.done

    const updatedTodo = await todo.save()
    ctx.body = updatedTodo
}

const destroy = async (ctx) => {
    const id = ctx.params.id
    const todo = await Todo.findById(id)
    const deletedTodo = await Todo.remove()
    cts.body = deletedTodo
}


module.exports = {
    findAll,
    create,
    destroy,
    update
}
