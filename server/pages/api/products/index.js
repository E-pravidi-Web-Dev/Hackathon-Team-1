import connectDB from '../../../lib/db';
import Product from '../../../models/Product';
import withErrorHandler from '../../../middleware/withErrorHandler';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { category, inStock } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (inStock !== undefined) query.inStock = inStock === 'true';

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export default withErrorHandler(handler);
