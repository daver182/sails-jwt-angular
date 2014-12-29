module.exports.policies = {
	'*': true,
	TestController: {
		'restricted': ['tokenAuth'],
		'*': false
	}
};
