/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import getComputedAttributes from 'lib/site/computed-attributes';
import {
	getRawSite,
	isSiteConflicting,
	getSiteTitle,
	getSiteSlug,
	getSiteDomain,
	isSitePreviewable
} from 'state/sites/selectors';

/**
 * Returns a normalized site object by its ID. Intends to replicate
 * the site object returned from the legacy `sites-list` module.
 *
 *
 * @param  {Object}  state  Global state tree
 * @param  {Number}  siteId Site ID
 * @return {?Object}        Site object
 */
export const getSite = createSelector(
	( state, siteId ) => {
		const site = getRawSite( state, siteId );

		if ( ! site ) {
			return null;
		}

		return {
			...site,
			...getComputedAttributes( site ),
			hasConflict: isSiteConflicting( state, siteId ),
			title: getSiteTitle( state, siteId ),
			slug: getSiteSlug( state, siteId ),
			domain: getSiteDomain( state, siteId ),
			is_previewable: isSitePreviewable( state, siteId )
		};
	},
	( state ) => state.sites.items
);
