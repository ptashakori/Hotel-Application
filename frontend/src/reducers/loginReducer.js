import {AUTH_LOGIN} from '../actions/login';

export default function (state = {}, action)
{
    switch(action.type)
    {
        case AUTH_LOGIN:
            return{
                ...state,
                resultAuth: action.payload.authFlag
            }

        default:
            return state;
    }
}