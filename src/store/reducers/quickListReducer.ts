import { createReducer } from '../../utils/createReducer';
import { createQuickList } from '../../utils/messages';
import { SET_QUICK_LIST, QuickListActions } from '../actions/types';
import { QuickListState, QuickListTypes } from '../types';

export const initialState = {
	quickList: [],
	quickListConfig:{},
};

const quickButtonsReducer = {
	[SET_QUICK_LIST]: (_: QuickListState, { list }) => ({
		quickList: [...list.list.map((list: QuickListTypes) => createQuickList(list))],
		quickListConfig:list.config,
	}),
};

export default (state = initialState, action: QuickListActions) => createReducer(quickButtonsReducer, state, action);
