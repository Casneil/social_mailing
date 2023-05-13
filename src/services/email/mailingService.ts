import nodemailer from 'nodemailer';

/*
		Example email config

		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "user@gmail.com", // list of receivers e.g 'user1@gmail.com, user2@gmail.com'
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
*/

interface MailConfig {
	from: string;
	to: string;
	subject?: string;
	text?: string;
	html?: string;
}

export const sendEmailToAuthenticateUser = async (config: MailConfig) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_SENDER,
			pass: process.env.GOOGLE_APP_PASSWORD
		}
	});

	try {
		const info = await transporter.sendMail({
			...config
		});
		console.log("Message sent: %s", info.messageId);
	}
	catch (error) {
		console.error(error);
		throw error;
	}
};
