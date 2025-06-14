import connectDB from '../../../../lib/db';
import Quotation from '../../../../models/Quotation';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Quotation ID is required'
    });
  }

  await connectDB();

  try {
    let quotation = await Quotation.findById(id)
      .populate('customer', '-__v')
      .populate('items.product', '-__v');
    
    if (!quotation) {
      return res.status(404).json({
        success: false,
        error: 'Quotation not found'
      });
    }

    switch (req.method) {
      case 'GET':
        res.status(200).json({
          success: true,
          data: quotation
        });
        break;

      case 'PUT':
        // Update quotation
        Object.assign(quotation, req.body);
        await quotation.save();
        // Re-populate after update
        quotation = await quotation.populate([
          { path: 'customer', select: '-__v' },
          { path: 'items.product', select: '-__v' }
        ]);
        
        res.status(200).json({
          success: true,
          data: quotation
        });
        break;

      case 'DELETE':
        await quotation.deleteOne();
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
