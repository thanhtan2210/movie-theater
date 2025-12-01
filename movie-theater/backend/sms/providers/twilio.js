// Twilio SMS provider
const twilio = require('twilio');

class TwilioProvider {
    constructor() {
        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    }

    async sendSms(toNumber, message) {
        try {
            const response = await this.client.messages.create({
                body: message,
                from: this.phoneNumber,
                to: toNumber
            });

            console.log(`SMS sent successfully: ${response.sid}`);
            return {
                success: true,
                messageId: response.sid,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('Failed to send SMS:', error.message);
            throw new Error(`SMS sending failed: ${error.message}`);
        }
    }

    async verifySms(toNumber, code) {
        try {
            const response = await this.client.messages.create({
                body: `Your verification code is: ${code}`,
                from: this.phoneNumber,
                to: toNumber
            });

            return {
                success: true,
                messageId: response.sid
            };
        } catch (error) {
            console.error('Failed to send verification SMS:', error.message);
            throw new Error(`Verification SMS failed: ${error.message}`);
        }
    }
}

module.exports = TwilioProvider;
