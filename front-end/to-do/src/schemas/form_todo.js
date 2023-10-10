const yup = require('yup')

const form_creatTodo = yup.object().shape({
        user: yup.number().min(0).required('Missing user id the new todo belongs to'),
        title: yup.string().min(5).max(50).required('title is required'),
        body: yup.string().min(3).max(100).required('body is required')
        })
const form_updateTodo = yup.object().shape({
        user: yup.number().min(0).required('Missing user id for the todo to be updated'),
        id: yup.number().min(0).required('Missing todo id'),
        title: yup.string().min(5).max(50).required('title is required'),
        body: yup.string().min(3).max(100).required('body is required')
        })

module.exports = {form_creatTodo, form_updateTodo}