/**
 * External Dependencies
 */
import React from 'react';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { localize } from 'i18n-calypso';
import Suggestion from './suggestion';
import { RelatedPostCard } from 'blocks/reader-related-card-v2';
import config from 'config';

const isRefresh = config.isEnabled( 'reader/refresh/stream' );
const dummyPosts = [ [
	{
		post: {
			ID: 1,
			title: 'What cats are best for coastal Maine? Do they like to chase around laser pointers?',
			site_ID: 1234,
			site_name: 'All the catsss',
			global_ID: 1,
			author: {
				name: 'wolvy'
			},
			canonical_image: {
				uri: 'http://lorempixel.com/256/256/cats/',
				height: 256,
				width: 256
			},
			site_URL: 'http://discover.wordpress.com',
			short_excerpt: 'Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.'
		},
		site: {
			title: 'All the catsss'
		}
	},
	{
		post: {
			ID: 2,
			title: 'No Site? No Problem.',
			site_ID: 99,
			site_name: '99 Problems',
			global_ID: 2,
			author: {
				name: 'wolvy'
			},
			canonical_image: {
				uri: 'http://lorempixel.com/1024/256/sports/',
				height: 256,
				width: 1024
			},
			site_URL: 'http://discover.wordpress.com',
			short_excerpt: 'Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko.'
		},
		site: {
			title: '99 Problems'
		}
	}, ], [
	{
		post: {
			ID: 3,
			global_ID: 3,
			site_ID: 3,
			author: {
				name: "ConservativeJoe",
			},
			date: "2016-09-27T08:20:33+00:00",
			modified: "2016-09-27T08:20:37+00:00",
			title: "Why Trump should Win the American Election.",
			reading_time: 152,
			better_excerpt: "This presidential race has, to be blunt, a cluster bomb of attacks, lies and outright nonsense rhetoric that has astounded many and made people curse at their screens, newspapers and media agencies they follow.",
			short_excerpt: "This presidential race has, to be blunt, a cluster bomb of attacks, lies and outright nonsense rhetoric that has astounded many and made people curse at their…",
			canonical_image: {
					uri: "https://freedomsandtruth.files.wordpress.com/2016/09/trump-rally-in-vegas-getty-640x480.jpg?w=720&quality=80&strip=info",
			}
		},
		site: {
			title: 'All the catsss'
		}
	},
	{
		post: {
			ID: 4,
			global_ID: 4,
			site_ID: 4,
			author: {
				name: "LiberalJoe",
			},
			date: "2016-09-27T08:20:33+00:00",
			modified: "2016-09-27T08:20:37+00:00",
			title: "Why Clinton should Win the American Election.",
			reading_time: 152,
			better_excerpt: "This presidential race, has, to be blunt, a lorem ipsum of devdocs demos.  HRC deserves the win because shes been playing the game longer than anybody, especially longer than trump. And she's tough.",
			short_excerpt: "This presidential race has, to be blunt, a cluster bomb of attacks, lies and outright nonsense rhetoric that has astounded many and made people curse at their…",
			canonical_image: {
					uri: "https://lh4.googleusercontent.com/-eXKU4UhFusI/AAAAAAAAAAI/AAAAAAAAATA/1QahWqsqd-I/s0-c-k-no-ns/photo.jpg",
			}
		},
		site: {
			title: '99 Problems'
		}
	},]
];


export function BlankContent( { translate, suggestions } ) {
	let suggest = null;
	if ( suggestions ) {
		let sugList = suggestions
			.map( function( query ) {
				return (
					<Suggestion suggestion={ query } />
				);
			} );
		sugList = sugList
			.slice( 1 )
			.reduce( function( xs, x ) {
				return xs.concat( [ ', ', x ] );
			}, [ sugList[ 0 ] ] );

		suggest = (
			<p className="search-stream__blank-suggestions">
				{ translate( 'Suggestions: {{suggestions /}}.', { components: { suggestions: sugList } } ) }
			</p> );
	}

	const imgPath = '/calypso/images/drake/drake-404.svg';

	return (
		<div className="search-stream__blank">
			{ suggest }
			<img src={ imgPath } width="500" className="empty-content__illustration" />
		</div>
	);
}

export function RefreshedBlankContent( { translate, suggestions } ) {
	let suggest = null;
	if ( suggestions ) {
		let sugList = suggestions
			.map( function( query ) {
				return (
					<Suggestion suggestion={ query } />
				);
			} );
		sugList = sugList
			.slice( 1 )
			.reduce( function( xs, x ) {
				return xs.concat( [ ', ', x ] );
			}, [ sugList[ 0 ] ] );

		suggest = (
			<p className="search-stream__blank-suggestions">
				{ translate( 'Suggestions: {{suggestions /}}.', { components: { suggestions: sugList } } ) }
			</p> );
	}


	return (
		<div className="search-stream__blank">
			{ suggest }
			<div className={ classnames( 'reader-related-card-v2__blocks' ) }>
				<h1 className="reader-related-card-v2__heading">{ 'where does this show up' }</h1>
				<ul className="reader-related-card-v2__list">
						{ dummyPosts[0].map( item => (
							<li className="reader-related-card-v2__list-item"> <RelatedPostCard key={ item.post.global_ID } post={ item.post } site={ item.site } /> </li>
						) ) }
				</ul>
			</div>

			<div className={ classnames( 'reader-related-card-v2__blocks' ) }>
				<h1 className="reader-related-card-v2__heading">{ 'where does this show up' }</h1>
				<ul className="reader-related-card-v2__list">
						{ dummyPosts[1].map( item => (
							<li className="reader-related-card-v2__list-item"> <RelatedPostCard key={ item.post.global_ID } post={ item.post } site={ item.site } /> </li>
						) ) }
				</ul>
			</div>
		</div>
	);
}

export default ( isRefresh
	? localize( RefreshedBlankContent )
	: localize( BlankContent ) )

