/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { filter, findLast } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import DocsSelectorsParamType from './param-type';

export default function DocsSelectorsResult( { url, name, description, tags, expanded } ) {
	const paramTags = filter( tags, { title: 'param' } );
	const returnTag = findLast( tags, { title: 'return' } );
	const classes = classnames( 'docs-selectors__result', {
		'is-expanded': expanded
	} );

	return (
		<Card compact className={ classes }>
			<h1 className="docs-selectors__result-name">
				{ url && <a href={ url }>{ name }</a> }
				{ ! url && name }
			</h1>
			<p>{ description || <em>No description available</em> }</p>
			{ paramTags.length > 0 && (
				<table className="docs-selectors__result-arguments">
					<thead>
						<tr>
							<th colSpan="2">
								<span className="docs-selectors__result-label">Arguments</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{ paramTags.map( ( tag ) => (
							<tr key={ tag.name }>
								<th>
									<strong>{ tag.name }</strong>
									<DocsSelectorsParamType { ...tag.type } />
								</th>
								<td>{ tag.description }</td>
							</tr>
						) ) }
					</tbody>
				</table>
			) }
			{ returnTag && (
				<div className="docs-selectors__result-return">
					<span className="docs-selectors__result-label">Returns</span>
					<p>{ returnTag.description }</p>
					<DocsSelectorsParamType { ...returnTag.type } />
				</div>
			) }
		</Card>
	);
}

DocsSelectorsResult.propTypes = {
	url: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	tags: PropTypes.array,
	expanded: PropTypes.bool
};
