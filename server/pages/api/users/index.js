import connectDB from '../../../lib/db';
import User from '../../../models/User';
import withErrorHandler from '../../../middleware/withErrorHandler';

export default withErrorHandler(async function handler(req, res){
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({}).select('-__v');
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
})
