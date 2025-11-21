const express = require('express');
const router = express.Router();
const supabase = require('../config/database');
const authenticate = require('../middleware/auth');

// Get user's study sessions
router.get('/', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Create new session
router.post('/', authenticate, async (req, res) => {
  try {
    const { deck_id } = req.body;

    if (!deck_id) {
      return res.status(400).json({ error: 'Deck ID is required' });
    }

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: req.user.id,
        deck_id,
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Update session (end session, update stats)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { ended_at, cards_studied, cards_correct } = req.body;

    // Verify ownership
    const { data: session, error: fetchError } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (fetchError) throw fetchError;
    if (session.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {};
    if (ended_at !== undefined) updateData.ended_at = ended_at;
    if (cards_studied !== undefined) updateData.cards_studied = cards_studied;
    if (cards_correct !== undefined) updateData.cards_correct = cards_correct;

    const { data, error } = await supabase
      .from('sessions')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

module.exports = router;

