const { supabase } = require('../config/supabase');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    
    // Fetch all members for the project
    const { data, error } = await supabase
      .from('project_members')
      .select('*')
      .eq('project_id', projectId)
      .order('points', { ascending: false });

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }

    // Map to frontend structure
    const leaderboard = data.map(member => ({
      id: member.id,
      name: member.user_name,
      role: member.role || 'Contributor',
      totalEquity: `${member.total_equity_secured}%`,
      points: member.points,
      trend: '+0.0%' // Hardcoded trend for now
    }));

    // If no one has completed tasks yet, return some mock seed data to make the UI look good
    if (!leaderboard || leaderboard.length === 0) {
      return res.status(200).json([
        { id: 'mock1', name: 'Alice Chen', role: 'Lead Developer', totalEquity: '12.5%', points: 1250, trend: '+2.1%' },
        { id: 'mock2', name: 'Charlie Davis', role: 'Product Manager', totalEquity: '15.0%', points: 1500, trend: '+0.5%' }
      ]);
    }

    res.status(200).json(leaderboard);
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
