/* eslint-disable no-magic-numbers */
const MULTIPLICATION_FACTOR = 10000000;
const RANDOM_FACTOR = 90000000;
const MINUTES_MILLI_SECONDS = 60 * 10000;
const EMAIL_TOKEN_EXPIRATION_MINUTES = 10 * MINUTES_MILLI_SECONDS;
const AUTHENTICATION_EXPIRATION_DAYS = 2 * 24 * MINUTES_MILLI_SECONDS;

const EMAIL_CONFIG = {
	from: process.env.EMAIL_SENDER ? process.env.EMAIL_SENDER : '',
	to: '',
	subject: 'Your one time login password: {code}',
	html: '<p>Please use this code to log in <b>{code}</b></p>'
};

export {
	MULTIPLICATION_FACTOR,
	RANDOM_FACTOR,
	EMAIL_TOKEN_EXPIRATION_MINUTES,
	AUTHENTICATION_EXPIRATION_DAYS,
	MINUTES_MILLI_SECONDS,
	EMAIL_CONFIG
};

