module.exports = {
  formatDate(date) {
    return new Date(date).toLocaleDateString();
  },
  formatDateTime(date) {
    if (date) {
      return new Date(date).toLocaleString();
    } else {
      return '';
    }
  },
  isValidEmail(email) {
    // The RegEx below was taken from the Full Stack docs, Week 17 Challenge README
    let emailRegEx = new RegExp(
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    );
    return emailRegEx.test(email);
  },
  isValidUrl(url) {
    // The RegEx below was taken from the Full Stack docs, Week 17 Challenge README
    let urlRegEx = new RegExp(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    );
    return urlRegEx.test(url);
  },
};
