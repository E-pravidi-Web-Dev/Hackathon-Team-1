export default function withErrorHandler(handler) {
  return async function wrappedHandler(req) {
    try {
      // Log method and URL (converted for fetch Request)
      console.log(`${req.method} ${req.url}`);

      // CORS headers (optional here unless using edge functions)
      if (req.method === 'OPTIONS') {
        return new Response(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers':
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        });
      }

      return await handler(req);
    } catch (error) {
      console.error(error);
      return Response.json(
        {
          success: false,
          error: 'Internal Server Error',
          message: error.message,
        },
        { status: 500 }
      );
    }
  };
}
