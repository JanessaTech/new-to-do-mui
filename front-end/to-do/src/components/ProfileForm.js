import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import Profile from "./Profile"
import {user} from "../schemas"

export default function ProfileForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(user.form_updateUser)
    })
  return (
    <Profile
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
    />
  )
}

