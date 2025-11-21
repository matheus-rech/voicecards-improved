const express = require('express');
const router = express.Router();
const supabase = require('../config/database');
const authenticate = require('../middleware/auth');

// Get user statistics
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total decks
    const { count: deckCount } = await supabase
      .from('decks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get total cards
    const { count: cardCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .innerJoin('decks', 'cards.deck_id', 'decks.id')
      .eq('decks.user_id', userId);

    // Get total sessions
    const { count: sessionCount } = await supabase
      .from('sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get card progress (spaced repetition data)
    const { data: progress } = await supabase
      .from('card_progress')
      .select('*')
      .innerJoin('cards', 'card_progress.card_id', 'cards.id')
      .innerJoin('decks', 'cards.deck_id', 'decks.id')
      .eq('decks.user_id', userId);

    // Calculate statistics
    const totalCards = cardCount || 0;
    const masteredCards = progress?.filter(p => p.ease_factor >= 2.5).length || 0;
    const learningCards = progress?.filter(p => p.ease_factor < 2.5 && p.repetitions > 0).length || 0;
    const newCards = totalCards - (progress?.length || 0);

    res.json({
      decks: deckCount || 0,
      cards: {
        total: totalCards,
        mastered: masteredCards,
        learning: learningCards,
        new: newCards
      },
      sessions: sessionCount || 0,
      progress: progress || []
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;

