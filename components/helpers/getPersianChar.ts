const arabicChar = ["ك", "دِ", "بِ", "زِ", "ذِ", "شِ", "سِ", "ى", "ي"];
const persianChar = ["ک", "د", "ب", "ز", "ذ", "ش", "س", "ی", "ی"];
const getPersianChar = (keyword: string) => {
  let persianKeyword = "";
  for (let i = 0; i < keyword.length; i++) {
    if (arabicChar.indexOf(keyword[i]) !== -1) {
      persianKeyword += persianChar[arabicChar.indexOf(keyword[i])];
    } else {
      persianKeyword += keyword[i];
    }
  }
  return persianKeyword;
};

export default getPersianChar;
