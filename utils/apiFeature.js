function addDollarSymbolToKeys(obj) {
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      ["gt", "gte", "lt", "lte"].some((symbolKey) => symbolKey === key)
    ) {
      const newKey = "$" + key;
      newObj[newKey] = obj[key];
    }
  }
  return obj;
}

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          productName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    let queryCopy = { ...this.queryStr };

    const removeFields = ["keyword","price", "page","resultPerPage", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    const modifiedQueryCopy = addDollarSymbolToKeys(queryCopy);
    this.query = this.query.find(modifiedQueryCopy);
    return this;
  }

  pagination(resultsPerPage = 5) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }

  sort(sortValue) {
    this.query.sort(sortValue);
    return this;
  }
}

module.exports.ApiFeatures = ApiFeatures;
