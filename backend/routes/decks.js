const express = require('express');
const router = express.Router();
const supabase = require('../config/database');
const authenticate = require('../middleware/auth');

// Get all decks for authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

// Get public/shared decks
router.get('/public', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching public decks:', error);
    res.status(500).json({ error: 'Failed to fetch public decks' });
  }
});

// Get single deck
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    // Check if user owns deck or if it's public
    if (data.user_id !== req.user.id && !data.is_public) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching deck:', error);
    res.status(500).json({ error: 'Failed to fetch deck' });
  }
});

// Create new deck
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, is_public = false } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Deck name is required' });
    }

    const { data, error } = await supabase
      .from('decks')
      .insert({
        user_id: req.user.id,
        name,
        description: description || '',
        is_public: is_public || false
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ error: 'Failed to create deck' });
  }
});

// Update deck
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, description, is_public } = req.body;

    // Verify ownership
    const { data: deck, error: fetchError } = await supabase
      .from('decks')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (fetchError) throw fetchError;
    if (deck.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (is_public !== undefined) updateData.is_public = is_public;

    const { data, error } = await supabase
      .from('decks')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating deck:', error);
    res.status(500).json({ error: 'Failed to update deck' });
  }
});

// Delete deck
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Verify ownership
    const { data: deck, error: fetchError } = await supabase
      .from('decks')
      .select('user_id')
      .eq('id', req.params.id)
      .single();

    if (fetchError) throw fetchError;
    if (deck.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { error } = await supabase
      .from('decks')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Error deleting deck:', error);
    res.status(500).json({ error: 'Failed to delete deck' });
  }
});

module.exports = router;

