import log from './log';

// These options are documented at https://acdn.adnxs.com/cmp/docs/#/config
// We highly recommend reading the options as the defaults may not fit your goals.


const defaultConfig = {
	customPurposeListLocation: '../cmp/src/docs/assets/purposes.json',
	// The location of the latest vendorlist to use.
	globalVendorListLocation: '../cmp_demo/getLatestVendorList.php',
	globalConsentLocation: './index.html',
	storeConsentGlobally: false,
	storePublisherData: false,
	logging: false,
	localization: {},
	forceLocale: null,
	gdprApplies: true,
	gdprAppliesGlobally: false,
	allowedVendorIds: ["47","126"],
	theme: {}
};

class Config {
	constructor() {
		this.update(defaultConfig);
	}

	update = (updates) => {
		if (updates && typeof updates === 'object') {
			const validKeys = Object.keys(defaultConfig);
			const { validUpdates, invalidKeys } = Object.keys(updates).reduce((acc, key) => {
				if (validKeys.indexOf(key) > -1) {
					acc.validUpdates = {
						...acc.validUpdates,
						[key]: updates[key]
					};
				}
				else {
					acc.invalidKeys.push(key);
				}
				return acc;
			}, { validUpdates: {}, invalidKeys: [] });

			Object.assign(this, validUpdates);
			if (invalidKeys.length) {
				log.warn(`Invalid CMP config values not applied: ${invalidKeys.join(', ')}`);
			}

		}
	};
}

export default new Config();
