const moment = require('moment');

exports.handler = async (event) => {
    // TODO implement
    const now = moment().format();

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        respuesta: {
            usuario: event.usuario,
            email: event.email,
            fecha: now
        }
    };

  
  
  console.log(response);

  return response;

  };
