/**
 * External dependencies
 */
import { has } from 'lodash';

/**
 * Internal dependencies
 */
import { getSeoTitleFormats, buildSeoTitle } from 'state/sites/selectors';

export const getSeoTitle = ( state, type, data ) => {
	if ( ! has( data, 'site.ID' ) ) {
		return '';
	}

	const titleFormats = getSeoTitleFormats( state, data.site.ID );

	return buildSeoTitle( titleFormats, type, data );
};
