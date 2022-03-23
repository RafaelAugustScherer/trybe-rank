const error = (err, _req, res, _next) => {
  const status = err.status ? err.status : 500

  if (status === 500) console.error(err);
  return res.status(status).json({ error: { code: status, message: err.message } })
}

export default error;