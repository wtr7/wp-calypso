/**
 * `AccountRecoveryReset` constructor.
 *
 * @constructor
 * @param {WPCOM} wpcom
 * @public
 */

function AccountRecoveryReset( userData, wpcom ) {
	if ( ! ( this instanceof AccountRecoveryReset ) ) {
		return new AccountRecoveryReset( wpcom );
	}

	this._userData = userData;
	this.wpcom = wpcom;
}

/**
 * Do an account recovery look up
 * @param  {Object} params  An object containing either user or firstname, lastname and url
 * @return {Promise}        Resolves to the response containing the transfer status
 */
AccountRecoveryReset.prototype.getResetOptions = function() {
	return this.wpcom.req.get( {
		body: this._userData,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/lookup',
	} );
};

export default AccountRecoveryReset;
