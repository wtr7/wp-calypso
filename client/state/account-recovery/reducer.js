/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import reset from './reset/reducer';
import settings from './reset/reducer';

export default combineReducers( {
	settings,
	reset,
} );
