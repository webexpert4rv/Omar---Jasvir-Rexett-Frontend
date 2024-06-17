// Example fetch-otp.js script
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// OAuth and Gmail API setup here...

function writeOtpToFile(otp) {
  fs.writeFileSync('otp.txt', otp);
}

// Example function to fetch OTP and write it to otp.txt
function fetchOtpAndWriteToFile(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.list(
    {
      userId: 'me',
      q: 'subject:OTP', // Adjust the search query as needed
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const messages = res.data.messages;
      if (messages.length) {
        messages.forEach((message) => {
          getMessage(auth, message.id);
        });
      } else {
        console.log('No messages found.');
      }
    }
  );
}

function getMessage(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.get(
    {
      userId: 'me',
      id: messageId,
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const message = res.data;
      const emailBody = Buffer.from(message.payload.parts[0].body.data, 'base64').toString('utf-8');
      console.log('Email body:', emailBody);

      const otpMatch = emailBody.match(/(\d{4})/); // Adjust the regex to match your OTP format
      if (otpMatch) {
        const otp = otpMatch[1];
        console.log('OTP:', otp);
        writeOtpToFile(otp); // Write OTP to otp.txt
      } else {
        console.log('OTP not found in the email body.');
      }
    }
  );
}

// Example: Fetch OTP and write it to otp.txt
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), fetchOtpAndWriteToFile);
});
