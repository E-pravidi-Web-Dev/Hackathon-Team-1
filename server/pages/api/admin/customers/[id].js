import connectDB from '../../../../lib/db';
import Customer from '../../../../models/Customer';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Customer ID is required'
    });
  }

  await connectDB();

  try {
    const customer = await Customer.findById(id);
    
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    switch (req.method) {
      case 'GET':
        res.status(200).json({
          success: true,
          data: customer
        });
        break;

      case 'PUT':
        // Update customer
        Object.assign(customer, req.body);
        await customer.save();
        res.status(200).json({
          success: true,
          data: customer
        });
        break;

      case 'DELETE':
        await customer.deleteOne();
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
