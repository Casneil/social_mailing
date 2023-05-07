import nodemailer from 'nodemailer';

/*
		Example email config

		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "user@gmail.com", // list of receivers
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

export const mailingService = async (config: MailConfig) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.EMAIL_SENDER,
			pass: process.env.GOOGLE_APP_PASSWORD
		}
	});

	const info = await transporter.sendMail({
		...config
	});
	console.log("Message sent: %s", info.messageId);
};
