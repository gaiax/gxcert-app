
function onlyNumbers(str) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < str.length; i++) {
    if (!numbers.includes(str[i])) {
      return false;
    }
  }
  return true;
}

export default {
  profileName: 20,
  certificateTitle: 50,
  certificateDescription: 200,
  groupName: 50,
  groupAddress: 100,
  groupPhone: 11,
  onlyNumbers,
}
