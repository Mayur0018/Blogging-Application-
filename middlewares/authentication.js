const { validateToken } = require("../services/authentication");
function checkForAuthenticationCookie(CookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[CookieName];
    if (!tokenCookieValue) {
      next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}

module.exports = {
    checkForAuthenticationCookie
}
