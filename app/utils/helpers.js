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