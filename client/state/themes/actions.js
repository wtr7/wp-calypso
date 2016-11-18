/** @ssr-ready **/

/**
 * External dependencies
 */
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	ACTIVE_THEME_REQUEST,
	ACTIVE_THEME_REQUEST_SUCCESS,
	ACTIVE_THEME_REQUEST_FAILURE,
	THEME_REQUEST,
	THEME_REQUEST_SUCCESS,
	THEME_REQUEST_FAILURE,
	THEMES_RECEIVE,
	THEMES_REQUEST,
	THEMES_REQUEST_SUCCESS,
	THEMES_REQUEST_FAILURE,
	THEME_ACTIVATE_REQUEST,
	THEME_ACTIVATE_REQUEST_SUCCESS,
	THEME_ACTIVATE_REQUEST_FAILURE,
	THEMES_RECEIVE_SERVER_ERROR,
} from 'state/action-types';
import {
	recordTracksEvent,
	withAnalytics
} from 'state/analytics/actions';
import { getCurrentTheme } from './current-theme/selectors';
import { getThemeById } from './themes/selectors';

const debug = debugFactory( 'calypso:themes:actions' ); //eslint-disable-line no-unused-vars

/**
 * Returns an action object to be used in signalling that a theme object has
 * been received.
 *
 * @param  {Object} theme  Theme received
 * @param  {Number} siteId ID of site for which themes have been received
 * @return {Object}        Action object
 */
export function receiveTheme( theme, siteId ) {
	return receiveThemes( [ theme ], siteId );
}

/**
 * Returns an action object to be used in signalling that theme objects have
 * been received.
 *
 * @param  {Array}  themes Themes received
 * @param  {Number} siteId ID of site for which themes have been received
 * @return {Object}        Action object
 */
export function receiveThemes( themes, siteId ) {
	return {
		type: THEMES_RECEIVE,
		themes,
		siteId
	};
}

/**
 * Triggers a network request to fetch themes for the specified site and query.
 *
 * @param  {Number|String}  siteId  Jetpack site ID or 'wpcom' for any WPCOM site
 * @param  {String}         query   Theme query
 * @return {Function}               Action thunk
 */
export function requestThemes( siteId, query = {} ) {
	return ( dispatch ) => {
		let siteIdToQuery, queryWithApiVersion;

		if ( siteId === 'wpcom' ) {
			siteIdToQuery = null;
			queryWithApiVersion = { ...query, apiVersion: '1.2' };
		} else {
			siteIdToQuery = siteId;
			queryWithApiVersion = { ...query, apiVersion: '1' };
		}

		dispatch( {
			type: THEMES_REQUEST,
			siteId,
			query
		} );

		return wpcom.undocumented().themes( siteIdToQuery, queryWithApiVersion ).then( ( { found, themes } ) => {
			dispatch( receiveThemes( themes, siteId ) );
			dispatch( {
				type: THEMES_REQUEST_SUCCESS,
				siteId,
				query,
				found,
				themes
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: THEMES_REQUEST_FAILURE,
				siteId,
				query,
				error
			} );
		} );
	};
}

/**
 * Triggers a network request to fetch a specific theme from a site.
 *
 * @param  {Number}   themeId Theme ID
 * @param  {Number}   siteId Site ID
 * @return {Function}        Action thunk
 */
export function requestTheme( themeId, siteId ) {
	return ( dispatch ) => {
		let siteIdToQuery;

		if ( siteId === 'wpcom' ) {
			siteIdToQuery = null;
		} else {
			siteIdToQuery = siteId;
		}

		dispatch( {
			type: THEME_REQUEST,
			siteId,
			themeId
		} );

		return wpcom.undocumented().themeDetails( themeId, siteIdToQuery ).then( ( theme ) => {
			dispatch( receiveTheme( theme, siteId ) );
			dispatch( {
				type: THEME_REQUEST_SUCCESS,
				siteId,
				themeId
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: THEME_REQUEST_FAILURE,
				siteId,
				themeId,
				error
			} );
		} );
	};
}

/**
 * This action queries wpcom endpoint for active theme for site.
 * If request success information about active theme is stored in Redux themes subtree.
 * In case of error, error is stored in Redux themes subtree.
 *
 * @param  {Object} siteId Site for which to check active theme
 * @return {Object}        Redux thunk with request action
 */
export function requestActiveTheme( siteId ) {
	return dispatch => {
		dispatch( {
			type: ACTIVE_THEME_REQUEST,
			siteId,
		} );

		return wpcom.undocumented().activeTheme( siteId )
			.then( theme => {
				debug( 'Received current theme', theme );
				dispatch( {
					type: ACTIVE_THEME_REQUEST_SUCCESS,
					siteId,
					themeId: theme.id,
					themeName: theme.name,
					themeCost: theme.cost
				} );
			} ).catch( error => {
				dispatch( {
					type: ACTIVE_THEME_REQUEST_FAILURE,
					siteId,
					error,
				} );
			} );
	};
}

export function receiveServerError( error ) {
	return {
		type: THEMES_RECEIVE_SERVER_ERROR,
		error: error
	};
}

export function activateTheme( themeId, siteId, source = 'unknown', purchased = false ) {
	return dispatch => {
		dispatch( {
			type: THEME_ACTIVATE_REQUEST,
			themeId,
			siteId,
		} );

		return wpcom.undocumented().activateTheme( themeId, siteId )
			.then( ( theme ) => {
				dispatch( themeActivated( theme, siteId, source, purchased ) );
			} )
			.catch( error => {
				dispatch( {
					type: THEME_ACTIVATE_REQUEST_FAILURE,
					themeId,
					siteId,
					error,
				} );
			} );
	};
}

export function themeActivated( theme, siteId, source = 'unknown', purchased = false ) {
	const themeActivatedThunk = ( dispatch, getState ) => {
		if ( typeof theme !== 'object' ) {
			theme = getThemeById( getState(), theme );
		}

		const action = {
			type: THEME_ACTIVATE_REQUEST_SUCCESS,
			theme,
			siteId,
		};
		const previousTheme = getCurrentTheme( getState(), siteId );
		const queryParams = getState().themes.themesList.get( 'query' );

		const trackThemeActivation = recordTracksEvent(
			'calypso_themeshowcase_theme_activate',
			{
				theme: theme.id,
				previous_theme: previousTheme.id,
				source: source,
				purchased: purchased,
				search_term: queryParams.get( 'search' ) || null
			}
		);
		dispatch( withAnalytics( trackThemeActivation, action ) );
	};
	return themeActivatedThunk; // it is named function just for testing purposes
}
