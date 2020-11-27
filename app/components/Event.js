import Axios from 'axios';
import React from 'react'
import styled from 'styled-components'
import { postBet } from '../utils/api'

const Card = styled.div`
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.6);
    transition: 0.3s;
    border-radius: 5px; 
    max-width: 600px;
    height: auto;
    padding-bottom: 1rem;
    text-align: center;
`;
const CardImageDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const TeamDiv = styled.div`
    text-align: center;
    margin: 0rem 1rem 1rem 1rem;
    border: 1rem grey;
    border-radius: 1rem;
    .active {
        background-color: goldenrod;
    }
`;
const CardInfo = styled.div`
    text-align: center;
    line-height: 20px;
`;
const LogoImg = styled.img`
    max-width: 100%;
    height: auto;
`;
const ScoreHeader = styled.h3`
    margin: auto;
    width: 50%;
    text-align: center;
`;
const CardHeader = styled.h3`
    line-clamp: 1;
    margin: 10px auto;
    text-align: center;
`
const WagerBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;  
    justify-content: center;
    text-align: center;
    line-height: 2rem;
    padding-bottom: .5rem;
`
const Checkbox = styled.div`
    display: grid;
    align-content: center;  
    justify-content: center;
`
const SubmitButton = styled.button`
    margin: .5rem;
`

export default function Event({event, user}) {
    const eventDate = new Date (event.competitions[0].date);
    const homeTeam = event.competitions[0].competitors[0].team;
    const visitingTeam = event.competitions[0].competitors[1].team;

    const homeCheck = React.useRef(null);
    const visitCheck = React.useRef(null);

    const [ homeLogoClass, setHomeLogoClass ] = React.useState('');
    const [ visitLogoClass, setVisitLogoClass ] = React.useState('');
    const [ betAmount, setBetAmount ] = React.useState(0);

    function handleCheck(e, id) {
        if(id === visitingTeam.id && homeCheck.current.checked) {
            homeCheck.current.checked = false;
        }
        if(id === homeTeam.id && visitCheck.current.checked) {
            visitCheck.current.checked = false;
        }
        if(id === visitingTeam.id && visitCheck.current.checked) {
            setVisitLogoClass('active');
            setHomeLogoClass('');
        } 
        if (id === homeTeam.id && homeCheck.current.checked) {
            setHomeLogoClass('active');
            setVisitLogoClass('');
        }
        if(!homeCheck.current.checked) {
            setHomeLogoClass('');
        }
        if (!visitCheck.current.checked) {
            setVisitLogoClass('');
        }
    }
    function updateBet(e) {

    }

    async function placeBet(e) {
        //const accessString = localStorage.getItem('JWT');
        e.preventDefault();
        let team;
        if (!homeCheck.current.checked && !visitCheck.current.checked) {
            alert("Please select a team for this wager.");
            return
        };
        if (betAmount < 1) {
            alert("Please enter an amount to wager.");
            return
        };
        if (homeCheck.current.checked) {team = homeTeam.id};
        if (visitCheck.current.checked) {team = visitingTeam.id};
        console.log(`${user} bet on game ${event.id} placed - ${betAmount} on ${team}.`)
        await postBet(user, event.id, team, betAmount);
    }

    return (
        <Card>
            <form onSubmit={(e) => placeBet(e)}>
                <CardHeader>{event.name}</CardHeader>
                <CardImageDiv>
                    <TeamDiv>
                        <label htmlFor={`check-${visitingTeam.id}`} >
                            <h4>Away</h4>
                            <LogoImg  className={` ${visitLogoClass}`} src={visitingTeam.logo} alt={visitingTeam.displayName}/>
                            <ScoreHeader>{visitingTeam.score}</ScoreHeader>
                            <Checkbox>
                                <input id={`check-${visitingTeam.id}`} type="checkbox" onClick={(e) => handleCheck(e, visitingTeam.id)} ref={visitCheck} hidden />
                            </Checkbox>
                        </label>
                    </TeamDiv>
                    <TeamDiv>
                        <label htmlFor={`check-${homeTeam.id}`} >
                            <h4>Home</h4>
                            <LogoImg className={`${homeLogoClass}`} src={homeTeam.logo} alt={homeTeam.displayName} />
                            <ScoreHeader>{homeTeam.score}</ScoreHeader>
                            <Checkbox>
                                <input id={`check-${homeTeam.id}`} type="checkbox" onClick={(e) => handleCheck(e, homeTeam.id)} ref={homeCheck} hidden />
                            </Checkbox>
                        </label>
                    </TeamDiv>
                </CardImageDiv>
                <h2>Line: </h2>
                <WagerBox className="wagerbox">
                    <InputBox>
                        <label><strong>Wager</strong></label>
                        <input value={betAmount || ''} type="number" placeholder="How much???" onChange={(e) => {console.log(e.currentTarget.value); setBetAmount(e.currentTarget.value)}}/>
                        <SubmitButton type='submit' >Place your bet!</SubmitButton>
                    </InputBox>
                </WagerBox>
                <CardInfo>
                    <p>{eventDate.toLocaleDateString([], {weekday: 'long', day: 'numeric', month: 'long'})+ " " + eventDate.toLocaleTimeString('en-US', {timeStyle: 'short'})}</p>
                    <p>{event.competitions[0].venue.fullName}</p>
                    <a href={event.links[0].href}>Gamecast</a>
                </CardInfo>
            </form>
        </Card>
    );
  }
  