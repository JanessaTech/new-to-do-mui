const yup = require('yup')
const {form_login, form_register, form_updateAccount} = require('./form_account')

const schemas = {
    login : yup.object({
        body: form_login
    }),
    register : yup.object({
        body: form_register
    }),
    updateAccount : yup.object({
        body: form_updateAccount
    }),
    deleteAccount :yup.object({
        params: yup.object({
            id : yup.number().required()
        })
    }),
    getByAccountId :yup.object({
        params: yup.object({
            id : yup.number().required()
        })
    })
}

module.exports = schemas