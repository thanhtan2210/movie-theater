// SMS Service main file
require('dotenv').config();
const TwilioProvider = require('./providers/twilio');

class SmsService {
  constructor() {
    const provider = process.env.SMS_PROVIDER || 'twilio';

    switch (provider) {
      case 'twilio':
        this.provider = new TwilioProvider();
        break;
      default:
        throw new Error(`Unknown SMS provider: ${provider}`);
    }
  }

  async sendSms(toNumber, message) {
    if (!toNumber || !message) {
      throw new Error('Phone number and message are required');
    }

    return await this.provider.sendSms(toNumber, message);
  }

  async sendVerificationCode(toNumber, code) {
    if (!toNumber || !code) {
      throw new Error('Phone number and code are required');
    }

    return await this.provider.verifySms(toNumber, code);
  }

  async sendBookingConfirmation(toNumber, bookingDetails) {
    const message = `Your booking confirmation: ${JSON.stringify(bookingDetails)}`;
    return await this.sendSms(toNumber, message);
  }

  async sendReminder(toNumber, eventDetails) {
    const message = `Reminder: ${JSON.stringify(eventDetails)}`;
    return await this.sendSms(toNumber, message);
  }
}

module.exports = new SmsService();
