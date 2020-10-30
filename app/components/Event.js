import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.6);
    transition: 0.3s;
    border-radius: 5px; 
    max-width: 600px;
    height: auto;
`;
const CardImageDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const TeamDiv = styled.div`
    
    
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`
const InputBox = styled.div`
    align-content: center;  
    display: grid;
    justify-content: center;
    text-align: center;
    line-height: 3rem;
`
const Checkbox = styled.div`
    align-content: center;  
    display: grid;
    justify-content: center;
`

export default function Event({event}) {
    const eventDate = new Date (event.competitions[0].date);
    return (
        <Card>
            <CardHeader>{event.name}</CardHeader>
            <CardImageDiv>
                <TeamDiv>
                    <LogoImg src={event.competitions[0].competitors[1].team.logo} alt={event.competitions[0].competitors[1].team.displayName}/>
                    <ScoreHeader>{event.competitions[0].competitors[1].score}</ScoreHeader>
                </TeamDiv>
                <TeamDiv>
                    <LogoImg src={event.competitions[0].competitors[0].team.logo} alt={event.competitions[0].competitors[0].team.displayName} />
                    <ScoreHeader>{event.competitions[0].competitors[0].score}</ScoreHeader>
                </TeamDiv>
            </CardImageDiv>
            <WagerBox>
                <Checkbox>
                    <input type="checkbox" />
                </Checkbox>
                <InputBox>
                    <label><strong>Wager</strong></label>
                    <input type="number" placeholder="How much???" />
                </InputBox>
                <Checkbox>
                    <input type="checkbox" />
                </Checkbox>
            </WagerBox>
            <CardInfo>
                <p>{eventDate.toLocaleDateString([], {weekday: 'long', day: 'numeric', month: 'long'})+ " " + eventDate.toLocaleTimeString('en-US', {timeStyle: 'short'})}</p>
                <p>{event.competitions[0].venue.fullName}</p>
                <a href={event.links[0].href}>Gamecast</a>
            </CardInfo>
        </Card>
    );
  }
  