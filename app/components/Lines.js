import React from 'react'
import axios from 'axios'
import { fetchScoreboard } from '../utils/api';
import { updateSingleLine, updateAllLines } from '../utils/helpers';

export default function Pickem() {
    const [week, setWeek] = React.useState(0);
    const [games, setGames] = React.useState(null);
    const [teams, setTeams] = React.useState(null);
    const [loadingGames, setLoadingGames] = React.useState(true);
    
    const getWeeksGames = async (week) => {
        const { data } = await axios.get(`http://localhost:3004/getWeeksGames/${week}`);
        setGames(data[0]);
        setTeams(data[1])
        setLoadingGames(false);
    }
    
    React.useEffect(() => {
        fetchScoreboard().then(res => {
            setWeek(res.week.number);
        });
    },[])

    React.useEffect( () => {
        setLoadingGames(true);
        getWeeksGames(week).then(res => setLoadingGames(false));
        console.log('games - ', games);
    },[week])
    
    const updateLineState = (e, gameId) => {
        e.preventDefault();
        let updatedGames = games.map(game => {
            if (game.id === gameId) {
                return {...game, line: e.currentTarget.value}
            } else { 
                return game;
            }
        });
        setGames(updatedGames);
    }

    const updateLineApi = async (e, gameId) => {
        e.preventDefault();
        const game = games.filter(game => game.id === gameId)
        console.log(game[0]);
        const update = await updateSingleLine(gameId, game[0].line)
            .then(data => {console.log(data)})
            .catch(err => console.log(err));
    }

    const updateAllLinesApi = async (e) => {
        e.preventDefault();
        console.log(e);
        const updates = await updateAllLines(games)
            .then(data => {console.log(data)})
            .catch(err => console.log(err));
    }

    if(loadingGames) {
        return <p>Loading Games</p>
    } 
    return (
        <div>
            <div>
                <select value={week} onChange={e => setWeek(e.currentTarget.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                </select>
            </div>
            <h3>Set the lines for week {week}!</h3>
            <form onSubmit={updateAllLinesApi}>
                <table>
                    <thead>
                        <tr>
                            <th>Home Team</th>
                            <th>Visiting Team</th>
                            <th>Date</th>
                            <th>Line</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => 
                            <tr key={game.id}>
                                <td>{teams.filter(team => team.id === game.homeTeam)[0] ? teams.filter(team => team.id === game.homeTeam)[0].displayName : ''}</td>
                                <td>{teams.filter(team => team.id === game.visitingTeam)[0] ? teams.filter(team => team.id === game.visitingTeam)[0].displayName : ''}</td>
                                <td>{game.date}</td>
                                <td><input type="number" step="0.5" placeholder={game.line} value={game.line} onChange={(e) => {updateLineState(e, game.id)}}/></td>
                                <td><button onClick={(e) => {updateLineApi(e, game.id)}}>Update Line</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    <button type="submit" >Update All Lines</button>
                </div>
            </form>
        </div>
    )
}