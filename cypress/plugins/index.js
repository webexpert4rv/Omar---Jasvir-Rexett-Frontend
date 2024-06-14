const fetchOtp = require('../../scripts/fetch-otp');

module.exports = (on, config) => {
  on('task', {
    fetchOtp() {
      return new Promise((resolve) => {
        fetchOtp((otp) => {
          resolve(otp);
        });
      });
    },
  });
};
