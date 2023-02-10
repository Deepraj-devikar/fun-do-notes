import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import logger from '../config/logger';

/**
 * Send mail utility
 * @param  {object} data - contains to, subject, text, html
 */
export const sendMail = (data) => {
	try {
		const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
		oauth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN
		});
		const accessToken = oauth2Client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'deeprajdevikar19@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken,
			}
		});
		const mailOptions = {
			from: 'DEEPRAJ <deeprajdevikar19@gmail.com>',
			to: data.to,
			subject: data.subject,
			text: data.text,
			html: data.html
		};
        transport.sendMail(mailOptions);
	} catch(error){
		logger.error("Error in send mail: ", error);
	}
}