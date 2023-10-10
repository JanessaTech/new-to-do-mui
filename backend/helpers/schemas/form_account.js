const yup = require('yup')

const form_login = yup.object({
        name : yup.string().min(5).max(15).required(),
        password: yup.string().min(5).max(10).required()
        })
const form_register = yup.object({
        name : yup.string().min(5).max(15).required(),
        password: yup.string().min(5).max(10).required(),
        email: yup.string().email().optional()
       })
const  form_updateAccount = yup.object({
        id : yup.number().required(),
        name : yup.string().min(5).max(15).required(),
        password: yup.string().min(5).max(10).optional(),
        email: yup.string().email().optional()
})

module.exports = {form_login, form_register, form_updateAccount}
