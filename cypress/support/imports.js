const req = require.context(
  '.',
  true,
  /(gestorBoletador|distribuidor|administrador|controladorPassivo|resquest_ApiExterna|resquest_ApiInterna|requestApi-PCO|requestApi-FOF|requestApi-CC)\.js|validacoesPage\.js$/
)
req.keys().forEach(req)
