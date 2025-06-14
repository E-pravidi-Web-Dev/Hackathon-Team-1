import connectDB from '../../../../lib/db';
import Customer from '../../../../models/Customer';
import { withAdmin } from '../../../../middleware/auth';
import withErrorHandler from '../../../../middleware/withErrorHandler';

async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      try {
        const customer = await Customer.create(req.body);
        res.status(201).json({
          success: true,
          data: customer
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
        const { search, sort = 'createdAt', order = 'desc' } = req.query;
        
        // Build query
        let query = {};
        if (search) {
          query = {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { company: { $regex: search, $options: 'i' } },
              { contactNo: { $regex: search, $options: 'i' } }
            ]
          };
        }

        const customers = await Customer.find(query)
          .sort({ [sort]: order === 'desc' ? -1 : 1 });

        res.status(200).json({
          success: true,
          data: customers
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
