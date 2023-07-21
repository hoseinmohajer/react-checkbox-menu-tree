import getPersianChar from "./getPersianChar";
const highlighter = (keyword, string, currentNode) => {
  let _keyword = getPersianChar(keyword);
  _keyword = _keyword.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");

  const result = new RegExp(_keyword, "gi");
  if (_keyword.length > 0) {
    if (currentNode) {
      return getPersianChar(string).replace(
        result,
        `<mark class="currentNodeHighlight">$&</mark>`
      );
    } else {
      return getPersianChar(string).replace(
        result,
        `<mark class="highlight">$&</mark>`
      );
    }
  }
  return string;
};
export default highlighter;
