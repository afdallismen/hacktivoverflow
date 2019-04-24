export default {
  loggedIn: function () {
    return localStorage.getItem('token') !== null
  }
}
