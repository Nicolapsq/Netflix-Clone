function errorsHandler(err, req, res, next) {
  console.error(err.message);
  res.status(500).json({
    error: err.message,
    message: "Si è verificato un errore interno del server",
  });
}

function notFound(req, res, next) {
  res.status(404).json({
    error: "Not found",
    message: "La risorsa richiesta non è stata trovata",
  });
}

module.exports = { errorsHandler, notFound };
