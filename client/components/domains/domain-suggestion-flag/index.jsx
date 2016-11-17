/**
 * External dependencies
 */
import React from 'react';
import { endsWith } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Notice from 'components/notice';

function DomainSuggestionFlag( { domain, translate } ) {
	const newTLDs = [ 'blog' ];

	if ( newTLDs.some( ( tld ) => {
		const isSubdomain = domain.substring( 0, domain.length - ( tld.length + 1 ) ).indexOf( '.' ) > -1;

		return endsWith( domain, tld ) && ! isSubdomain;
	} ) ) {
		return (
			<Notice
				isCompact
				status="is-success">
				{ translate( 'New', { context: 'Domain suggestion flag' } ) }
			</Notice>
		);
	}

	return null;
}

export default localize( DomainSuggestionFlag );
