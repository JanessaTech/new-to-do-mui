import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import Login from "./Login";
import {user} from "../schemas"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(user.form_login)
    })
  return (
    <Login
        register={register}
        formHandleSubmit={handleSubmit}
        errors={errors}
    />
  )
}

