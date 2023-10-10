import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import UpdateDialog from './UpdateDialog'
import {todo} from "../schemas"

export default function UpdateDialogForm(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(todo.form_updateTodo)
    })

  return (
    <UpdateDialog
        register={register}
        formHandleSubmit={handleSubmit}
        errors={errors}
        {...props}
    />
  )
}

