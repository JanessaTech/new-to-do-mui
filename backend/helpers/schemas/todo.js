const yup = require('yup')
const {form_creatTodo, form_updateTodo} = require('./form_todo')

const schemas = {
    getAllTodos: yup.object({
        params: yup.object({
            user: yup.number().min(0).required()
        })
    }),
    creatTodo: yup.object({
        body: form_creatTodo
    }),
    updateTodo: yup.object({
        body: form_updateTodo
    }),
    deleteTodoById: yup.object({
        params: yup.object({
            user: yup.number().min(0).required(),
            id : yup.number().required()
        })
    })

}

module.exports = schemas


