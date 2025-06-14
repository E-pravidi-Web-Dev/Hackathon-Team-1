import connectDB from '../../../../lib/db';
import Product from '../../../../models/Product';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json({
          success: true,
          data: product
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      }
      break;

    case 'GET':
      try {
        const products = await Product.find().sort({ createdAt: -1 });
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
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

// Apply admin middleware
export default withErrorHandler(withAdmin(handler));
