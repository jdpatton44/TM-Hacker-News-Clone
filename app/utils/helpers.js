import axios from 'axios'

export function formatDate (timestamp) {
    return new Date(timestamp * 1000)
      .toLocaleDateString("en-US", {
        hour: 'numeric' ,
        minute: 'numeric'
      })
  }

export async function checkLogin (username, accessString) {
  try {
    const user = await axios.get('http://localhost:3004/findUser', {
    params: {
      username,
    },
    headers: { Authorization: `JWT ${accessString}` },
    }).then( res => {
      console.log('helper - ', res.data)
      return res.data;
    })
  } catch (error) {
    console.error(error);
    return error;
    };
}

export async function updateSingleLine(gameId, newLine) {
  const postMessage = await axios.post('http://localhost:3004/setSingleLine', {
    gameId,
    newLine
  }).then((res) => {
    console.log('helper', res.data)
    return res.data;
  }, (err) => {
    return err;
  });
  return postMessage;
}

export async function updateAllLines(games) {
  console.log('games -- ', games);
  const postMessage = await axios.post('http://localhost:3004/setAllLines', {
    games
  }).then((res) => {
    console.log('helper', res.data)
    return res.data;
  }, (err) => {
    return err;
  });
  return postMessage;
}

