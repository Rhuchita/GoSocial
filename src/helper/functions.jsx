export default function makeid(length) {
  var result = "";
  var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charlen = char.length;
  for (var i = 0; i < length; i++) {
    result += char.charAt(Math.floor(Math.random() * charlen));
  }
  return result;
}
