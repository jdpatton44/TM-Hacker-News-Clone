import React from 'react';
import styled from 'styled-components';

const StyledFormContainer = styled.div`
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.6);
    transition: 0.3s;
    border-radius: 5px; 
    height: auto;
    padding-bottom: 1rem;
    text-align: center;
`;
const StyledInputsDiv = styled.div`
    margin: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    [label] {
        margin: 1rem;
    }
`;

export default function Register() {
    const [ first, setFirst ] = React.useState('');
    const [ last, setLast ] = React.useState('');
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    

    function handleSubmit() {
        console.log()
    }
    return (
    <StyledFormContainer>
        <form onSubmit={handleSubmit}>
            <StyledInputsDiv>
                <label htmlFor="first">First Name </label>
                <input id="first" value={first} onChange={(e) => setFirst(e.current.target.value)} type="text" />
                <label htmlFor="last">Last Name </label>
                <input id="last" value={last} onChange={(e) => setLast(e.current.target.value)} type="text" />
                <label htmlFor="username">Username </label>
                <input id="username" value={username} onChange={(e) => setUsername(e.current.target.value)} type="text" />
                <label htmlFor="password">Password </label>
                <input id="password" value={password} onChange={(e) => setPassword(e.current.target.value)} type="password" />
            </StyledInputsDiv>
        </form>
    </StyledFormContainer>
    )
}