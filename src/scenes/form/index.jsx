import { Box, Button, TextField,FormControl, InputLabel } from "@mui/material";
import { Formik,Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {db} from "../../config/firebase";
import { doc, setDoc,collection, query, orderBy, limit, getDocs,onSnapshot } from "firebase/firestore";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    
    try {
      const q = query(collection(db, "members"),orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].id);
      let nb =parseInt(querySnapshot.docs[0].id) + 1;
      const member = values;
      member.id =nb;
      console.log(member);
      
      
      await setDoc(doc(db, "members", nb.toString()),member);
      console.log("Data ADD",member);
 
  }catch (error){console.error("error waiting document")}
  
};




  return (
    <Box m="20px">
      <Header title="CREATE MEMBER" subtitle="Create a New MEMBER Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"              
              sx={{ 
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.UserName}
                name="UserName"
                error={!!touched.UserName && !!errors.UserName}
                helperText={touched.UserName && errors.UserName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FirstName}
                name="FirstName"
                error={!!touched.FirstName && !!errors.FirstName}
                helperText={touched.FirstName && errors.FirstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.LastName}
                name="LastName"
                error={!!touched.LastName && !!errors.LastName}
                helperText={touched.LastName && errors.LastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Email}
                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Password}
                name="Password"
                error={!!touched.Password && !!errors.Password}
                helperText={touched.Password && errors.Password}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />


              

              {/* trying select  */}

              <Field name="access">
              {({ field, meta }) => (
                <FormControl sx={{ minWidth: 120, marginBottom: '20px' }} error={meta.touched && !!meta.error}>
                  <InputLabel id="role-select-label">access</InputLabel>
                  <Select
                    {...field}
                    labelId="role-select-label"
                    id="role-select"
                    label="access"
                  >
                    <MenuItem value="">
                      <em>Select a privilge</em>
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Field>
                

              {/* end trying */}


              {/*Date of birth*/}

              <Field name="DateBirth">
              {({ field, meta }) => (
                <FormControl sx={{ minWidth: 120, marginBottom: '20px' }} error={meta.touched && !!meta.error}>
                  <TextField
                    {...field}
                    id="DateBirth"
                    label="DateBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              )}
            </Field>

              

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  FirstName: yup.string().required("required"),
  LastName: yup.string().required("required"),
  UserName: yup.string().required("required"),
  Password: yup.string().required("required"),
  Email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  // date: yup.string().required("required"),
  
});
const initialValues = {
  id:"",
  UserName:"",
  FirstName: "",
  LastName: "",
  Email: "",
  contact: "",
  DateBirth: "",
  access:"",
  Password:"",
};

export default Form;
