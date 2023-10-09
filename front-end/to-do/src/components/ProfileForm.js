import { useForm } from "react-hook-form"
import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import Profile from "./Profile"
import {updateUser} from "../schemas"

export default function ProfileForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(updateUser)
    })
  return (
    <Profile
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
    />
  )
}

