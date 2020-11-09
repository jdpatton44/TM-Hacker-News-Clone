import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';


const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
`

const LoginForm = styled.form`
    box-sizing:border-box;
    align-content: center;
    input /*[type=text] */ {
        padding:10px;
        border:0;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.1);
        padding:10px;
        border-radius:10px;
        width: 100%;
        margin: .5rem
    }
    button {
        appearance:none;
        -webkit-appearance:none;
        padding:10px;
        border:none;
        background-color:#3F51B5;
        color:#fff;
        font-weight:600;
        border-radius:5px;
        width:100%;
        margin: .5rem;
    }
`

const ButtonContainer = styled.div`
    display: grid;
    justify-content: center;
    align-content: center;
`
const ButtonSubContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-content: center;
`

export default function Login() {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [loggedIn, setLoggedIn ] = useState(false);
    const [showError, setShowError ] = useState(false);
    const [showNullError, setShowNullError ] = useState(false);

    const handleChange = name => (event) => {
        name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value);
      };
    
    const loginUser = async (e) => {
        e.preventDefault();
        console.log(e);
        if (username === '' || password === '') {
            setShowError(false);
            setShowNullError(true);
            setLoggedIn(false);
            }
        try {
            const response = await axios.post('http://localhost:3004/loginUser', {
                username,
                password,
            });
            console.log(response)
            localStorage.setItem('JWT', response.data.token);
            setLoggedIn(true);
            setShowError(false);
            setShowNullError(false);
            }
        catch (error) {
            console.error(error.response.data);
        if (
            error.response.data === 'bad username'
            || error.response.data === 'passwords do not match'
        ) {
            setShowError(true);
            setShowNullError(false);
            }
        };
    }

    if(!loggedIn) {
        return (
        <LoginContainer>
            <LoginForm onSubmit={loginUser}>
                <input 
                    id="username"
                    label="username"
                    value={username}
                    onChange={handleChange('username')}
                    placeholder="Username"
                    type="text" 
                />
                <input 
                    id="password"
                    label="password"
                    value={password}
                    onChange={handleChange('password')}
                    placeholder="Password"
                    type="password"
                />
                <ButtonContainer>
                    <button type="submit" >Log In</button>
                    <ButtonSubContainer>
                        <button>
                            <Link to={`/register`}>
                            Register Here
                            </Link>
                        </button>
                        <button>
                            <Link to={`/forgot`}>
                            Forgot Password?
                            </Link>
                        </button>
                    </ButtonSubContainer>
                </ButtonContainer>
            </LoginForm>
        </LoginContainer>
        )
    } else {
        return <Redirect to={`/pickem/${username}`} />;
    }
}