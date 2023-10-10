const yup = require('yup')
const {form_register, form_login, form_updateUser} = require('./form_user')

const schemas= {
    register : yup.object({
        body:  form_register
    }),
    login : yup.object({
        body: form_login
    }),
    getByUserId :yup.object({
        params: yup.object({
            id : yup.number().required()
        })
    }),
    updateUser: yup.object({
        body: form_updateUser
    })
}

module.exports = schemas