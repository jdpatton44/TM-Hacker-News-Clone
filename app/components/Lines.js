import React from 'react'
import axios from 'axios'

export default function Pickem() {
    const [week, setWeek] = React.useState(0);
    const [games, setGames] = React.useState({});
    const [loadingGames, setLoadingGames] = React.useState(true);
    
    const getWeeksGames = async (week) => {
        const { data } = await axios.get(`http://localhost:3004/getWeeksGames/${week}`);
        setGames(data);
        setLoadingGames(false);
    }

    React.useEffect( () => {
        getWeeksGames(week);
    },[week])
    console.log(games)

    if( week === 0 ) {
        return (
            <div>
                <label>Select the week to enter game lines.</label>
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
        )
    }
    if(loadingGames) {
        <p>Loading Games</p>
    } else {
    return (
        <div>
            <h3>Set the lines for week {week}!</h3>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Home Team</th>
                        <th>Visiting Team</th>
                        <th>Date</th>
                        <th>Line</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => 
                        <tr>
                            <td>{game.id}</td>
                            <td>{game.homeTeam}</td>
                            <td>{game.visitingTeam}</td>
                            <td>{game.line}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
                }
}