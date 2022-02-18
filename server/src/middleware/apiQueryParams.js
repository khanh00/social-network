const apiQueryParams = (req, _, next) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\bgt|gte|lt|lte|text[^textScore]|search|regex|options|meta|ne\b/g,
    (match) => `$${match}`
  );
  const queryObj = JSON.parse(queryStr);
  ['sort', 'fields', 'page', 'limit'].forEach(
    (key) => delete queryObj[`${key}`]
  );
  req.query.filter = queryObj;

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    req.query.sort = sortBy;
  } else {
    req.query.sort = '-createdAt';
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    req.query.select = fields;
  } else {
    req.query.select = '-__v';
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  req.query.skip = skip;
  req.query.limit = limit;

  next();
};

export default apiQueryParams;
