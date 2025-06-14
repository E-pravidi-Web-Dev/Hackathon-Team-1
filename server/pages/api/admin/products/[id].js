import connectDB from '../../../../lib/db';
import Product from '../../../../models/Product';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }

  await connectDB();

  try {
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    switch (req.method) {
      case 'PUT':
        // Update product
        Object.assign(product, req.body);
        await product.save();
        res.status(200).json({
          success: true,
          data: product
        });
        break;

      case 'DELETE':
        await product.deleteOne();
        res.status(200).json({
          success: true,
          data: {}
        });
        break;

      default:
        res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// Apply admin middleware
export default withErrorHandler(withAdmin(handler));
