const sendResponse = (res, status, message, notify, data) => {
  return res.status(status).json({ message, status, notify, data });
};

export { sendResponse };
