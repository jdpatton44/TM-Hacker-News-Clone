import React from 'react'
import { fetchScoreboard } from '../utils/api';
import Loading from './Loading';
import Event from './Event';
import styled from 'styled-components';
import axios from 'axios'
import { checkLogin } from '../utils/helpers';


const EventContainer = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}
`
const WeekDiv = styled.h1`
    align-content: center;  
    display: grid;
    justify-content: center;
    text-align: center;
    margin-bottom: 1rem;
`

function scoreboardReducer(state, action) {
    if (action.type === 'fetch') {
        return {
          scores: null,
          error: null,
          loading: true,
        };
      }
      if (action.type === 'success') {
        return {
          scores: action.scores,
          error: null,
          loading: false,
        };
      }
      if (action.type === 'error') {
        return {
          scores: state.scores,
          error: action.message,
          loading: false,
        };
      }
    
      throw new Error('That action type is not supported.');
    }

export default function Pickem({match}) {
    const [state, dispatch] = React.useReducer(
        scoreboardReducer, { 
            scores: null, 
            error: null, 
            loading: true 
        });
    const [auth, setAuth ] = React.useState(false);
    const { username }= match.params;
    
    async function getAuth() {
      const accessString = localStorage.getItem('JWT');
      const { data } = await axios.get('http://localhost:3004/findUser', {
        params: {
          username,
        },
        headers: { Authorization: `JWT ${accessString}` },
      });
      setAuth(data.auth);
    }

    React.useEffect(() => {
      getAuth();
    },[username])

    React.useEffect(() => {
      dispatch({type: 'fetch'});
      fetchScoreboard()
        .then(scores => {dispatch({ type: 'success', scores })})
        .catch(({ message }) => dispatch({ type: 'error', error: message }));

    },[]);

    const { scores, error, loading } = state;
    
    if (loading) {
        return <Loading loading={loading} />;
    }
    if (!auth) {
      return <p>Please login</p>
    }
    console.log(scores.events);
    return (
        <>
            <WeekDiv>Week {scores.week.number}</WeekDiv>
            <EventContainer>
            {scores.events.map(event => {
                return <Event key={event.id} event={event} />
            })}
            </EventContainer>
        </>
    )
}