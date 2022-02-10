const catchAsync = (fn) => {
  return async (...rest) => {
    try {
      const response = await fn(...rest);
      return { data: response.data.data };
    } catch (error) {
      return { error: error.response.data.data };
    }
  };
};

export default catchAsync;
