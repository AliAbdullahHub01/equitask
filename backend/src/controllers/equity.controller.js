const { supabase } = require('../config/supabase');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // In a real application, you would:
    // 1. Fetch all members for the project
    // 2. Fetch all completed tasks
    // 3. Aggregate points and calculate percentage of the pool
    
    // Returning mock data matching the frontend design for now
    res.status(200).json([
      { id: 1, name: 'Alice Chen', role: 'Lead Developer', totalEquity: '12.5%', points: 1250, trend: '+2.1%' },
      { id: 3, name: 'Charlie Davis', role: 'Product Manager', totalEquity: '15.0%', points: 1500, trend: '+0.5%' }
    ]);
  } catch (error) {
    next(error);
  }
};

exports.recalculateEquity = async (req, res, next) => {
  try {
    // Admin function to force recalculation if parameters change
    res.status(200).json({ message: 'Equity pool recalculated successfully' });
  } catch (error) {
    next(error);
  }
};
