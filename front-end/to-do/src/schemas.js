import * as yup from "yup";

const signup = yup.object().shape({
                    name : yup.string().min(5).max(15).required('The length of User name must be between 5 and 15'),
                    password: yup
                            .string().required('Password is required')
                            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            'Password should contain at least one letter, one number and minimum eight characters'),
                    passwordConfirm: yup
                                    .string().required("Passwords does not match")
                                    .oneOf([yup.ref("password"), null], "Passwords must match"),
                    email: yup.string().email("Incorrect email format").optional(),
                    age: yup.number().min(20).max(60).optional()
                })
const login =  yup.object().shape({
                    name : yup.string().min(5).max(15).required('The length of User name must be between 5 and 15'),
                    password: yup
                            .string().required('Password is required')
                            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            'Password should contain at least one letter, one number and minimum eight characters'),
                })
const updateUser =  yup.object().shape({
                        id : yup.number().required('id is missing'),
                        name : yup.string().min(5).max(15).required('The length of User name must be between 5 and 15'),
                        password: yup
                            .string().required('Password is required')
                            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            'Password should contain at least one letter, one number and minimum eight characters'),
                        email: yup.string().email("Incorrect email format").optional(),
                        age: yup.number().min(20).max(60).optional()    
                })

export {signup, login, updateUser}