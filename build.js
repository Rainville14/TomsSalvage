const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
	IS_PROD,
	ENVIRONMENT: process.env.NODE_ENV,
	PORT: process.env.npm_config_port || 3000
};
