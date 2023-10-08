import * as yup from "yup";

const schema = yup.object().shape({
    name : yup.string().min(5).max(15).required('The length of User name must be between 5 and 15'),
})

export default schema