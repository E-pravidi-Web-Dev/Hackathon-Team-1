import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import withErrorHandler from '../../../middleware/withErrorHandler';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { email, password } = req.body;
    // Get user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Don't send password back
    user.password = undefined;

    res.status(200).json({
      success: true,
      data: { user, token }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export default withErrorHandler(handler);
