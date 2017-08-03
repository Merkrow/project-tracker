export default {
  getDate(date) {
    return /\d{4}-\d{2}-\d{2}/.exec(date)[0];
  }
}
