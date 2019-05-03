import axios from 'axios';
export const AUTH_LOGIN = "AUTH_LOGIN";

export function submitLogin(data)
{
    return function(dispatch)
    {
        var authFlag = false;

        axios.post('http://localhost:3001/login', data)
            .then(response => {
                if (response.status === 200)
                {
                    authFlag = true;

                    dispatch({
                        type: AUTH_LOGIN,
                        payload: {authFlag}
                    });
                }
            });
    }
}