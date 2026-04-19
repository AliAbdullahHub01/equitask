const { supabase } = require('../config/supabase');

exports.completeTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userName } = req.body; // Using a demo userName from the frontend

    if (!userName) {
      return res.status(400).json({ error: 'userName is required' });
    }

    // 1. Fetch the task to ensure it exists
    const { data: task, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (fetchError || !task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // 2. Mark task as done
    await supabase.from('tasks').update({ status: 'done' }).eq('id', taskId);

    // 3. Find or create the user in the project_members equity ledger
    let { data: member } = await supabase
      .from('project_members')
      .select('*')
      .eq('project_id', task.project_id)
      .eq('user_name', userName)
      .single();

    if (!member) {
      // Auto-seed user if they don't exist yet
      const { data: newMember } = await supabase
        .from('project_members')
        .insert([{ 
          project_id: task.project_id, 
          user_name: userName, 
          role: 'Demo User', 
          points: 0, 
          total_equity_secured: 0 
        }])
        .select()
        .single();
      member = newMember;
    }

    // 4. The Equity Engine Math!
    // We add the task's equity percentage to the user's total secured equity.
    // We also give them 100 points for every 1% of equity.
    const addedEquity = parseFloat(task.equity_value);
    const addedPoints = Math.round(addedEquity * 100);

    const newEquity = parseFloat(member.total_equity_secured) + addedEquity;
    const newPoints = member.points + addedPoints;

    await supabase
      .from('project_members')
      .update({ points: newPoints, total_equity_secured: newEquity })
      .eq('id', member.id);

    res.status(200).json({
      message: 'Task completed successfully',
      equity_distributed: true,
      task_id: taskId,
      awarded_to: userName,
      equity_value: addedEquity,
      new_total: newEquity
    });

  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, projectId, equityValue } = req.body;
    
    if (!title || !projectId) {
      return res.status(400).json({ error: 'Title and projectId are required' });
    }

    // Insert task via Supabase admin client
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { title, project_id: projectId, equity_value: equityValue || 1.0, status: 'todo' }
      ])
      .select();

    if (error) {
       console.log('Error inserting task (table might not exist yet):', error);
       return res.status(201).json({ id: 'mock-id', title, status: 'todo', equityValue });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

exports.getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // First check if there are any tasks
    let { data, error } = await supabase
      .from('tasks')
      .select('*');

    // If no tasks exist, let's auto-seed a Demo Project and tasks to make the UI look good!
    if (!data || data.length === 0) {
      console.log('No tasks found. Auto-seeding database for demo...');
      
      // 1. Create a demo project
      const { data: projData, error: projError } = await supabase
        .from('projects')
        .insert([{ name: 'Demo EquiTask Project', total_equity_pool: 100.0 }])
        .select()
        .single();
        
      if (!projError && projData) {
        // 2. Insert demo tasks linked to this project
        await supabase.from('tasks').insert([
          { title: 'Design landing page mockup', equity_value: 2.50, status: 'todo', project_id: projData.id },
          { title: 'Setup Supabase schemas', equity_value: 1.00, status: 'in-progress', project_id: projData.id },
          { title: 'Fix mobile navigation bug', equity_value: 0.50, status: 'review', project_id: projData.id }
        ]);
        
        // Fetch the newly created tasks
        const { data: newTasks } = await supabase.from('tasks').select('*');
        return res.status(200).json(newTasks || []);
      }
    }

    res.status(200).json(data || []);
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const { data, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Error updating status:', error);
      return res.status(500).json({ error: 'Failed to update status' });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
