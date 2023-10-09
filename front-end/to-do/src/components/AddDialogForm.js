import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import {creatTodo} from "../schemas"
import AddDialog from "./AddDialog"

export default function AddDialogForm(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(creatTodo)
    })

  return (
    <AddDialog
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
      {...props}
    />
  )
}

