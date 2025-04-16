module.exports = (query) => {
  const objectSearch = {
    keyword: ""
  }
  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    const regex = new RegExp(objectSearch.keyword, "i"); // i for case insensitive
    objectSearch.regex = regex;

  }
  return objectSearch;
}