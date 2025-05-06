const replaceLithuanianChars = (str) => {
    const charMap = {
      ą: "a",
      č: "c",
      ę: "e",
      ė: "e",
      į: "i",
      š: "s",
      ų: "u",
      ū: "u",
      ž: "z",
      Ą: "a",
      Č: "c",
      Ę: "e",
      Ė: "e",
      Į: "i",
      Š: "s",
      Ų: "u",
      Ū: "z",
      Ž: "z",
    };

    return str
    .normalize("NFKD")
    .replace(/[„“‘’"']/g, "-")
    .replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, (char) => charMap[char] || char)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, "") 
    .replace(/-{2,}/g, "-")
    .toLowerCase();
  
  };
  export default replaceLithuanianChars