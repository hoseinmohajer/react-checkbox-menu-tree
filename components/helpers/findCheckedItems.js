import USING_PROPERTY from "../constants/usingProperty";

const findCheckedItems = (data, usingProperty) => {
  const getProperty = (property) => {
    if (usingProperty && usingProperty[property]) {
      return usingProperty[property];
    }
    return USING_PROPERTY[property];
  };
  let IDS = [];
  const finder = (data) => {
    if (data) {
      data.forEach((item) => {
        if (
          item[getProperty("checked")] === "FULL" ||
          item[getProperty("checked")] === "HALF"
        ) {
          if (IDS.indexOf(item[getProperty("id")]) === -1) {
            IDS.push(item[getProperty("id")]);
          }
        } else {
          IDS = IDS.filter(
            (id) => Number(id) !== Number(item[getProperty("id")])
          );
        }

        finder(item[getProperty("children")]);
      });
    }
    return IDS;
  };
  return finder(data);
};

export default findCheckedItems;
