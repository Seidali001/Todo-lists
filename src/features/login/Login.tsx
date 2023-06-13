import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, TDispatch} from "../../components/app/store";
import {loginTC} from "../login/auth-reducer"
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch: TDispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password is required'
            }
            if (values.password.length < 3) {
                errors.password = 'password is short'
            } else if (!/^[A-Z0-9]+$/i.test(values.password)) {
                errors.password = 'Invalid password address'
            }
            return errors
        },
        onSubmit: values => {
            /*alert(JSON.stringify(values))*/
            formik.resetForm()
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                /*name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}*/
                                       {...formik.getFieldProps('email')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                            {/*{formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}*/}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"

                                       {...formik.getFieldProps('password')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                            {/*{formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}*/}
                            <FormControlLabel style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", marginTop: "10px"}}
                                              label={'Remember me'}
                                              control={
                                                  <Checkbox
                                                      {...formik.getFieldProps('rememberMe')}
                                                      checked={formik.values.rememberMe}/>}

                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>)
}