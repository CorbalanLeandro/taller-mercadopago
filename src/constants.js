const HOST = 'https://mercadopago-workshop-cert.herokuapp.com/'
module.exports = {
  TEST_ACCESS_TOKEN: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
  TEST_INTEGRATOR_ID: 'dev_24c65fb163bf11ea96500242ac130004',
  MERCADOPAGO_REDIRECT_URL: `${HOST}mercadopagoRedirect?status=`,
  MERCADOPAGO_NOTIFICATION_URL : `${HOST}mercadopagoNotification`
}