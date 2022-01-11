const sendJsonRes = (res, code, data) => {
  let status = 'error';

  if (code >= 200 && code <= 299) status = 'success';
  if (code >= 400 && code <= 499) status = 'fail';

  if (status === 'error') {
    return res.status(code).json({ status, message: data });
  }

  return res.status(code).json({ status, data });
};

export default sendJsonRes;
