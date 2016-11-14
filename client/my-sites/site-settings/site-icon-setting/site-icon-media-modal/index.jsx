/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import AsyncLoad from 'components/async-load';
import Dialog from 'components/dialog';
import MediaLibrarySelectedData from 'components/data/media-library-selected-data';
import { getSelectedSiteId } from 'state/ui/selectors';

class SiteIconMediaModal extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		onClose: PropTypes.func,
		siteId: PropTypes.number
	};

	static defaultProps = {
		onClose: () => {}
	};

	setSiteIcon = ( mediaId ) => {
		// [TODO]: Handle setting site icon
		console.log( mediaId ); // eslint-disable-line no-console
		this.props.onClose();
	};

	render() {
		const { visible, siteId } = this.props;
		if ( ! visible ) {
			return null;
		}

		return (
			<MediaLibrarySelectedData siteId={ siteId }>
				<AsyncLoad
					require="post-editor/media-modal"
					placeholder={ (
						<Dialog
							additionalClassNames="editor-media-modal"
							isVisible />
					) }
					siteId={ siteId }
					onClose={ this.setSiteIcon }
					enabledFilters={ [ 'images' ] }
					visible
					single />
			</MediaLibrarySelectedData>
		);
	}
}

export default connect( ( state ) => ( {
	siteId: getSelectedSiteId( state )
} ) )( SiteIconMediaModal );
