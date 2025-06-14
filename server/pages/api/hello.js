import connectDB from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to MongoDB (this is optional for this simple endpoint, 
    // but good to verify the connection works)
    await connectDB();

    return res.status(200).json({ 
      message: 'Hello from the API!',
      status: 'Database connected'
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
}
