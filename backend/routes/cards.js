const express = require('express');
const router = express.Router();
const supabase = require('../config/database');
const authenticate = require('../middleware/auth');

// Get all cards for a deck
router.get('/deck/:deckId', authenticate, async (req, res) => {
  try {
    // Verify deck ownership
    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .select('user_id, is_public')
      .eq('id', req.params.deckId)
      .single();

    if (deckError) throw deckError;
    if (deck.user_id !== req.user.id && !deck.is_public) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('deck_id', req.params.deckId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Get single card
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*, decks!inner(user_id, is_public)')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    const deck = data.decks;
    if (deck.user_id !== req.user.id && !deck.is_public) {
      return res.status(403).json({ error: 'Access denied' });
    }

    delete data.decks;
    res.json(data);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// Create new card
router.post('/', authenticate, async (req, res) => {
  try {
    const { deck_id, front, back, pronunciation } = req.body;

    if (!deck_id || !front || !back) {
      return res.status(400).json({ error: 'Deck ID, front, and back are required' });
    }

    // Verify deck ownership
    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .select('user_id')
      .eq('id', deck_id)
      .single();

    if (deckError) throw deckError;
    if (deck.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { data, error } = await supabase
      .from('cards')
      .insert({
        deck_id,
        front,
        back,
        pronunciation: pronunciation || ''
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Update card
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { front, back, pronunciation } = req.body;

    // Verify ownership through deck
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .select('deck_id, decks!inner(user_id)')
      .eq('id', req.params.id)
      .single();

    if (cardError) throw cardError;
    if (card.decks.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updateData = {};
    if (front !== undefined) updateData.front = front;
    if (back !== undefined) updateData.back = back;
    if (pronunciation !== undefined) updateData.pronunciation = pronunciation;

    const { data, error } = await supabase
      .from('cards')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// Delete card
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Verify ownership through deck
    const { data: card, error: cardError } = await supabase
      .from('cards')
      .select('deck_id, decks!inner(user_id)')
      .eq('id', req.params.id)
      .single();

    if (cardError) throw cardError;
    if (card.decks.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

module.exports = router;

