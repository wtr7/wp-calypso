/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
	ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
	ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST,
	SERIALIZE,
} from 'state/action-types';

const resetOptions = createReducer( {}, {
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST ]: ( state ) => ( {
		...state,
		isRequesting: true,
	} ),
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE ]: ( state, { options } ) => ( {
		...state,
		isRequesting: false,
		options,
	} ),
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR ]: ( state, { error } ) => ( {
		...state,
		isRequesting: true,
		error,
	} ),
	[ SERIALIZE ]: () => ( {} ),
} );

export default combineReducers( {
	options: resetOptions,
} );
