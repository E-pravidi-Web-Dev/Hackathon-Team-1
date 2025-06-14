import { withAuth, withAdmin } from '../../../middleware/auth';
import withErrorHandler from '../../../middleware/withErrorHandler';
import User from '../../../models/User';

// Protected route example
const protectedHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Access the authenticated user from req.user
  const users = await User.find().select('-password');

  return res.status(200).json({
    success: true,
    data: users
  });
};

// Apply both error handling and authentication middleware
export default withErrorHandler(withAuth(protectedHandler));
