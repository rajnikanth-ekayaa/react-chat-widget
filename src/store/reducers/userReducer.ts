import { UserState } from '../types';

import { createReducer } from '../../utils/createReducer';
import { SWITCH_USER, UserActions } from '../actions/types';

export const initialState = {
	userID: 'admin',
};

const messagesReducer = {
	[SWITCH_USER]: (state: UserState, { id }) => ({
		...state,
		userID: id,
	}),
};

export default (state = initialState, action: UserActions) => createReducer(messagesReducer, state, action);
