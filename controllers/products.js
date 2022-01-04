const Products = require('../models/product');

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$e',
      '<': '$lt',
      '<=': '$lte',
    };
    const regex = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [name, operator, value] = item.split('-');

      if (options.includes(name)) {
        queryObj[name] = { [operator]: Number(value) };
      }
    });
  }

  let result = Products.find(queryObj);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(202).json({ products, nbHits: products.length });
};

const getAllProductsStatic = (req, res) => {
  res.send('get all products static');
};

module.exports = { getAllProducts, getAllProductsStatic };
