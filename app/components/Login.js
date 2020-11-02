import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [loggedIn, setLoggedIn ] = useState(false);
    const [showError, setShowError ] = useState(false);
    const [showNullError, setShowNullError ] = useState(false);

    const handleChange = name => (event) => {
        name === 'username' ? setUsername(event.target.value) : setPassword(event.target.value);
      };
    
    // const loginUser = async (e) => {
    //     e.preventDefault();
    //     if (username === '' || password === '') {
    //         setShowError(false);
    //         setShowNullError(true);
    //         setLoggedIn(false);
    //         }
    //     const response = fetch('http://localhost:3003/loginUser', {
    //             method: 'POST',
    //             body: {username2, password},
    //             redirect: 'follow',
    //         }).then(res => {
    //             localStorage.setItem('JWT', response.data.token);
    //             setLoggedIn(true);
    //             setShowError(false);
    //             setShowNullError(false);
    //             })
    //     .catch( (error) => {
    //         console.error(error.response.data);
    //     if (
    //         error.response.data === 'bad username'
    //         || error.response.data === 'passwords do not match'
    //     ) {
    //         setShowError(true);
    //         setShowNullError(false);
    //         }
    //     });
    // }

    if(!loggedIn) {
        return (
        <div>
            <form>
                <input 
                    id="username"
                    label="username"
                    value={username}
                    onChange={() => handleChange('username')}
                    placeholder="Username"
                    type="text" 
                />
                <input 
                    id="password"
                    label="password"
                    value={password}
                    onChange={() => handleChange('password')}
                    placeholder="Password"
                    type="password"
                />
                <button type="submit" >Log In</button>
            </form>
        </div>
        )
    } else {
        return <Redirect to={`/`} />;
    }
}