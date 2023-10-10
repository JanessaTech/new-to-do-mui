import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import Signup from "./Signup"
import {user} from "../schemas"

export default function SignupForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(user.form_register)
    })

  return (
    <Signup
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
    />
  )
}

