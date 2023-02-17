import { createStore, combineReducers, compose } from 'redux';

import user, { initialState as userIS } from './reducers/userReducer';
import behavior, { initialState as behaviorIS } from './reducers/behaviorReducer';
import messages, { initialState as messagesIS } from './reducers/messagesReducer';
import quickButtons, { initialState as quickButtonIS } from './reducers/quickButtonsReducer';
import quickList, { initialState as quickListIS } from './reducers/quickListReducer';
import preview, { initialState as previewIS } from './reducers/fullscreenPreviewReducer';
import { SWITCH_USER } from './actions/types';
import { GlobalState } from '@types';
import { parseISO } from 'date-fns';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducer = combineReducers({ user, behavior, messages, quickButtons, quickList,preview });

const userReducer = (rootReducer: any) => {
	return function reducer(state: any, action: any) {
		console.log('Old State', state);
		if (action.type === SWITCH_USER) {
			//LOAD USER DATA..
			console.log('LOAD USER DATA..', state);
			let newState = rootReducer(state, action);
			const localStoreData = localStorage.getItem('store.user.' + action.id);
			const data = localStoreData
				? JSON.parse(localStoreData, (key, value) => (key === 'timestamp' ? parseISO(value) : value))
				: {
						behavior: behaviorIS,
						messages: messagesIS,
						quickList:quickListIS,
						quickButtons: quickButtonIS,
						preview: previewIS,
						user: { userID: action.id },
				  };
			console.log('LOAD USER DATA.. > localStoreData', data);
			return data; //this just return initialData.
		}
		let newState = rootReducer(state, action);
		console.log('New State', newState);
		//simple save state to localStorage if state changed
		if (state !== newState) localStorage.setItem('store.user.' + newState.user.userID, JSON.stringify(newState));
		return newState;
	};
};

export default createStore(userReducer(reducer), composeEnhancers());
