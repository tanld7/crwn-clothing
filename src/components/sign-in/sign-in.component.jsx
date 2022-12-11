import React, {Component} from 'react';

import './sign-in.styles.scss'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils"

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const {email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            // After successfully sign-in with email and password, we reset the sign-in form's fields
            this.setState({
                email: '',
                password: ''
            })
        } catch (error) {
            console.log(error)
        }
        this.setState({email: '', password: ''}) // Clear the form after submit
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' label='Email' value={this.state.email} handleChange={this.handleChange} required />
                    <FormInput name='password' type='password' label='Password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;