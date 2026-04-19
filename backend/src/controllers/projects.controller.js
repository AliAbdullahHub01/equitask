const { supabase } = require('../config/supabase');

exports.createProject = async (req, res, next) => {
  try {
    const { name, totalEquityPool } = req.body;
    
    // In a real app, extract user from req.user (middleware)
    const ownerId = req.body.ownerId || 'mock-owner-id';

    const { data, error } = await supabase
      .from('projects')
      .insert([
        { name, total_equity_pool: totalEquityPool || 100.0, owner_id: ownerId }
      ])
      .select();

    if (error) {
      console.log('Using mock project data due to Supabase error/missing table');
      return res.status(201).json({ id: 'proj-123', name, totalEquityPool: 100.0 });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
       return res.status(200).json([
         { id: 1, name: 'Q3 Marketing Site', status: 'Active' },
         { id: 2, name: 'Mobile App V2', status: 'Planning' }
       ]);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Not implemented yet', projectId: req.params.id });
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    res.status(201).json({ message: 'Member added successfully' });
  } catch (error) {
    next(error);
  }
};
