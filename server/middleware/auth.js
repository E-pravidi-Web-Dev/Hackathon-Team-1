import jwt from 'jsonwebtoken';
import User from '../models/User';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ 
          success: false, 
          error: 'Authentication required' 
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: 'User not found' 
        });
      }

      // Attach user to request
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid token' 
      });
    }
  };
}

export function withAdmin(handler) {
  return async (req, res) => {
    return withAuth(async (req, res) => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: 'Admin access required' 
        });
      }
      return handler(req, res);
    })(req, res);
  };
}
