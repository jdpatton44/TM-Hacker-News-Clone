export function formatDate (timestamp) {
    return new Date(timestamp * 1000)
      .toLocaleDateString("en-US", {
        hour: 'numeric' ,
        minute: 'numeric'
      })
  }

export async function checkLogin (username, accessString) {
  const login = {
    user: '',
    error: null,
  }
  try {
    const user = await axios.get('http://localhost:3004/findUser', {
    params: {
      username,
    },
    headers: { Authorization: `JWT ${accessString}` },
    })
    login.user = user;
    return login;
  } catch (error) {
    console.error(error.response.data);
    login.error = error.response.data;
    return login;
    };
}