/**
 * @function respondWithResult
 * @description Function that returns response with data
 * @param {Object} res - Express Framework Response Object
 * @param {Number=} statusCode - Response status code
 */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

/**
 * @function handleEntityNotFound
 * @description Function that handle entity not found respond
 * @param {Object} res - Express Framework Response Object
 */
function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity || entity.Count === 0) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * @function handleError
 * @description Function that returns response with error details
 * @param {Object} res - Express Framework Response Object
 * @param {Number=} statusCode - Response status code
 */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return (err) => res.status(statusCode).send(err);
}

export { handleError, handleEntityNotFound, respondWithResult };
