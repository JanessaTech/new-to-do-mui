import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import Login from "./Login";
import {login} from "../schemas"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(login)
    })
  return (
    <Login
        register={register}
        formHandleSubmit={handleSubmit}
        errors={errors}
    />
  )
}

