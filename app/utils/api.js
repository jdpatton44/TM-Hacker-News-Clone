const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'
const axios = require('axios');

function removeDead (posts) {
    return posts.filter(Boolean).filter(({ dead }) => dead !== true)
  }
  
function removeDeleted (posts) {
    return posts.filter(({ deleted }) => deleted !== true)
  }
  
function onlyComments (posts) {
    return posts.filter(({ type }) => type === 'comment')
  }
  
function onlyPosts (posts) {
    return posts.filter(({ type }) => type === 'story')
  }
  
export function fetchItem (id) {
    return fetch(`${api}/item/${id}${json}`)
      .then((res) => res.json())
  }
  
export function fetchComments (ids) {
    return Promise.all(ids.map(fetchItem))
      .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
  }
  
export function fetchMainPosts (type) {
    return fetch(`${api}/${type}stories${json}`)
      .then((res) => res.json())
      .then((ids) => {
        if (!ids) {
          throw new Error(`There was an error fetching the ${type} posts.`)
        }
  
        return ids.slice(0, 50)
      })
      .then((ids) => Promise.all(ids.map(fetchItem)))
      .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
  }
  
// export function fetchUser (id) {
//     return fetch(`${api}/user/${id}${json}`)
//       .then((res) => res.json())
//   }
  
export function fetchPosts (ids) {
    return Promise.all(ids.map(fetchItem))
      .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
  }

export function fetchScoreboard () {
    return fetch(`http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`)
      .then((scores) => scores.json())
}

export async function postBet(user, event, team, amount) {
  console.log('placing bet...')
  const accessString = localStorage.getItem('JWT');
  try { 
    const bet = await axios.post('http://localhost:3004/placeBet', {
      user,
      event,
      team,
      amount,
    },
    {headers: { Authorization: `JWT ${accessString}` }},);
    console.log('place bet', res.data)
    return res.data;
  }
  catch (err) {
    console.log(err);
    return err;
  }
}