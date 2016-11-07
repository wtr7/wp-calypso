/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { some, omit } from 'lodash';

/**
 * Internal dependencies
 */
import MediaLibrarySelectedData from 'components/data/media-library-selected-data';
import MediaModal from 'post-editor/media-modal';
import PostActions from 'lib/posts/actions';
import { generateGalleryShortcode } from 'lib/media/utils';
import markup from 'post-editor/media-modal/markup';
import { bumpStat } from 'state/analytics/actions';
import { getSelectedSiteId } from 'state/ui/selectors';

class EditorMediaModal extends Component {
	static propTypes = {
		siteId: PropTypes.number,
		onInsertMedia: PropTypes.func,
		onClose: PropTypes.func
	};

	static defaultProps = {
		onInsertMedia: () => {},
		onClose: () => {}
	};

	insertMedia = ( selectedItems, { gallerySettings } = {} ) => {
		let media, stat;

		if ( gallerySettings ) {
			if ( 'individual' === gallerySettings.type ) {
				media = gallerySettings.items.map( markup.get ).join( '' );
			} else {
				media = generateGalleryShortcode( gallerySettings );
			}

			stat = 'insert_gallery';
		} else {
			media = selectedItems.map( markup.get ).join( '' );
			stat = 'insert_item';
		}

		if ( some( selectedItems, 'transient' ) ) {
			PostActions.blockSave( 'MEDIA_MODAL_TRANSIENT_INSERT' );
		}

		if ( media ) {
			this.props.onInsertMedia( media );

			if ( stat ) {
				this.props.bumpStat( 'editor_media_actions', stat );
			}
		}

		this.props.onClose();
	};

	render() {
		const { siteId } = this.props;

		return (
			<MediaLibrarySelectedData siteId={ siteId }>
				<MediaModal
					{ ...omit( this.props, [ 'onInsertMedia', 'onClose' ] ) }
					onClose={ this.insertMedia } />
			</MediaLibrarySelectedData>
		);
	}
}

export default connect(
	( state ) => ( {
		siteId: getSelectedSiteId( state )
	} ),
	{ bumpStat }
)( EditorMediaModal );
