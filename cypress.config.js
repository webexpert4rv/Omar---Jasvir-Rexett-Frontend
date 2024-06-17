const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getOtp() {
          return new Promise((resolve, reject) => {
            exec('node fetch-otp.js', (error, stdout, stderr) => {
              if (error) {
                console.error('Error executing fetch-otp.js:', error);
                console.error('stderr:', stderr);
                return reject(new Error(`Execution error: ${stderr || error.message}`));
              } else {
                console.log('stdout:', stdout);

                try {
                  const otp = fs.readFileSync('otp.txt', 'utf8').trim();
                  console.log('Read OTP from file:', otp);
                  resolve(otp);
                } catch (readError) {
                  console.error('Error reading otp.txt:', readError);
                  reject(new Error(`Read error: ${readError.message}`));
                }
              }
            });
          });
        },
      });
    },
  },
};
