import {User} from "@utils/types";

export default function userReducer(user: User, action: {user:User, type: string}) {
    if (action.type === 'setUser') {
      return action.user;
    } else if (action.type === 'updateUser') {
      return action.user;
    } else if (action.type === 'signOut') {
      return null;
    } else {
      throw Error('Unknown action: ' + action.type);
    }
  }