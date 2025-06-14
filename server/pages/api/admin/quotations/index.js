import connectDB from '../../../../lib/db';
import Quotation from '../../../../models/Quotation';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      try {
        const quotation = await Quotation.create(req.body);
        // Populate the created quotation with customer and product details
        await quotation.populate([
          { path: 'customer', select: '-__v' },
          { path: 'items.product', select: '-__v' }
        ]);

        res.status(201).json({
          success: true,
          data: quotation
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
        const { status, customerId } = req.query;
        
        // Build query
        let query = {};
        if (status) query.status = status;
        if (customerId) query.customer = customerId;

        const quotations = await Quotation.find(query)
          .populate('customer', '-__v')
          .populate('items.product', '-__v')
          .sort({ createdAt: -1 });

        res.status(200).json({
          success: true,
          data: quotations
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
