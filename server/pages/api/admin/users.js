import { withAdmin } from '../../../middleware/auth';
import withErrorHandler from '../../../middleware/withErrorHandler';
import User from '../../../models/User';

// Admin-only route example
const adminHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // This route is only accessible by admins
  // You can perform admin-specific operations here
  const users = await User.find().select('+password -__v');

  return res.status(200).json({
    success: true,
    data: users
  });
};

// Apply both error handling and admin authentication middleware
export default withErrorHandler(withAdmin(adminHandler));
