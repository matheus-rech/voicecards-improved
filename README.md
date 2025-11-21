# VoiceCards - Hands-Free Flashcard Learning App

A voice-powered flashcard application designed for hands-free learning. Perfect for studying while driving, cooking, or any activity where your hands are busy. Features spaced repetition algorithm, multiple AI integrations, and full offline support.

## 🌟 Features

### Core Features
- **Hands-Free Mode**: Complete voice-controlled flashcard study sessions
- **Spaced Repetition**: SM-2 algorithm for optimal learning intervals
- **Offline Support**: Full PWA with IndexedDB storage and Service Worker
- **Mobile-First Design**: Optimized for mobile devices with bottom navigation
- **Deck Management**: Create, import, export, and organize flashcard decks
- **Analytics**: Track your learning progress and statistics

### Voice Features
- **Continuous Voice Recognition**: Hands-free card navigation and rating
- **Wake Word Activation**: Say "Hey VoiceCards" to activate voice commands
- **Natural Language Commands**: 
  - Rate cards: "easy", "good", "hard", "again"
  - Navigate: "next", "repeat", "show answer"
  - Control: "stop", "pause", "resume"
- **Audio Feedback**: Text-to-speech for card content and instructions
- **Background Audio**: Continues playing even when screen is locked

### AI Integrations
- **Gemini Live API**: Real-time conversational AI with natural voice interactions
- **Gemini Text-to-Speech**: High-quality TTS with 30+ voices and 24 languages
- **OpenAI Realtime API**: Voice conversations with tool calling via Agents SDK
- **Conversational Agent**: Ask questions and get hints about flashcard content

### Technical Features
- **Progressive Web App (PWA)**: Installable, works offline
- **IndexedDB Storage**: Client-side database for cards, sessions, and settings
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Quick navigation and control
- **Voice Visualizer**: Visual feedback during voice recognition

## 🚀 Quick Start

### Option 1: Direct Use (No Setup Required)
1. Download `voice-flashcard-prototype.html`
2. Open it in a modern web browser (Chrome, Edge, Safari, Firefox)
3. Start using immediately!

### Option 2: GitHub Pages (Hosted)
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access your app at `https://yourusername.github.io/voicecards-improved/`

### Option 3: Local Server (Recommended for Development)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```
Then open `http://localhost:8000/voice-flashcard-prototype.html` in your browser.

## 📋 Prerequisites

- Modern web browser with:
  - JavaScript enabled
  - Web Speech API support (Chrome, Edge, Safari 14.1+)
  - IndexedDB support
  - Service Worker support (for PWA features)

### Optional: AI Features Setup

#### Gemini Live API & TTS
1. Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Go to Settings → AI Settings
3. Enter your Gemini API key
4. Enable "Gemini Live API" and/or "Gemini Text-to-Speech"
5. (For TTS) Select your preferred voice

#### OpenAI Realtime API
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Go to Settings → AI Settings
3. Enter your OpenAI API key
4. Enable "OpenAI Realtime API"

**Note**: AI features require API keys and internet connection. Core flashcard functionality works completely offline.

## 📖 Usage Guide

### Creating Your First Deck
1. Click "Decks" in the navigation
2. Click "Create Deck"
3. Enter deck name and description
4. Click "Create"

### Adding Cards
1. Select a deck
2. Click "Add Card" or use the card editor
3. Enter:
   - **Front**: Question or prompt
   - **Back**: Answer or definition
   - **Pronunciation** (optional): Pronunciation guide
4. Click "Save Card"

### Starting a Study Session
1. Go to "Study" section
2. Select a deck
3. Click "Start Session" or say "start session"
4. Cards will be presented based on spaced repetition algorithm

### Hands-Free Mode
1. Click the microphone button (🎙️) or FAB on mobile
2. Say "Hey VoiceCards" (if wake word mode is enabled)
3. Use voice commands:
   - **"Show"** or **"Show answer"** - Reveal the answer
   - **"Easy"**, **"Good"**, **"Hard"**, **"Again"** - Rate the card
   - **"Next"** or **"Next card"** - Move to next card
   - **"Repeat"** - Repeat the current card
   - **"Stop"** - End the session

### Voice Commands Reference
- **Rating**: "easy", "good", "hard", "again", "i know this", "i forgot"
- **Navigation**: "next", "next card", "skip", "repeat", "say again"
- **Answer**: "show", "show answer", "reveal", "tell me"
- **Help**: "hint", "give me a hint", "help me"
- **Control**: "stop", "end session", "pause", "resume", "continue"

## 🎯 Spaced Repetition Algorithm

The app uses the SM-2 algorithm to optimize learning:
- Cards are scheduled based on your performance
- Easy cards appear less frequently
- Hard cards appear more frequently
- Algorithm adapts to your learning pace

## 🔧 Settings

### General Settings
- **Speech Rate**: Adjust text-to-speech speed
- **Auto-advance**: Automatically move to next card after rating
- **Wake Word Mode**: Require "Hey VoiceCards" before commands
- **Background Audio**: Keep audio playing when screen is locked

### AI Settings
- **Gemini Live API**: Enable conversational AI
- **Gemini TTS**: Enable high-quality text-to-speech
- **OpenAI Realtime API**: Enable OpenAI voice conversations
- **Conversational Agent**: Enable hints and explanations

## 📱 Mobile Features

- **Bottom Navigation**: Easy thumb access to main sections
- **Floating Action Button (FAB)**: Quick access to hands-free mode
- **Touch-Optimized**: Large buttons and touch-friendly controls
- **Full-Screen Support**: Immersive learning experience

## 🔒 Privacy & Data

- All data is stored locally in your browser (IndexedDB)
- No data is sent to servers (except when using AI features)
- API keys are stored in localStorage (never shared)
- Export/Import functionality for data portability

## 🛠️ Technical Details

### Architecture
- **Single HTML File**: Everything in one file for easy deployment
- **Vanilla JavaScript**: No external dependencies (except optional AI SDKs)
- **IndexedDB**: Client-side database for persistence
- **Service Worker**: Offline support and caching

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Safari 14.1+
- ✅ Firefox (limited voice features)
- ⚠️ Service Workers require HTTPS (or localhost)

### File Structure
```
voice-flashcard-prototype.html
├── HTML Structure
├── CSS Styles (embedded)
└── JavaScript (embedded)
    ├── AppState
    ├── Database (IndexedDB)
    ├── VoiceEngine
    ├── SpacedRepetition (SM-2)
    ├── GeminiLiveAgent
    ├── GeminiTTS
    ├── OpenAIRealtimeAgent
    └── ConversationalAgent
```

## 🐛 Troubleshooting

### Voice Recognition Not Working
- Ensure microphone permissions are granted
- Use Chrome or Edge for best compatibility
- Check that Web Speech API is supported

### Audio Not Playing
- Click anywhere on the page first (browser autoplay policy)
- Check browser audio settings
- Ensure AudioContext is initialized (happens on first user interaction)

### Service Worker Errors
- Service Workers require HTTPS or localhost
- File:// protocol doesn't support Service Workers (expected)

### AI Features Not Working
- Verify API keys are correct
- Check internet connection
- Review browser console for error messages

## 📝 Keyboard Shortcuts

- `Space` - Show answer / Next card
- `1-5` - Rate card (1=hard, 5=easy)
- `N` - Next card
- `R` - Repeat card
- `S` - Start session
- `E` - End session

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- SM-2 Algorithm: Based on SuperMemo 2 algorithm
- Web Speech API: Browser-native speech recognition and synthesis
- Google Gemini API: For Live API and TTS features
- OpenAI: For Realtime API integration

## 🔗 Resources

- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Gemini Live API](https://ai.google.dev/gemini-api/docs/live)
- [Gemini TTS](https://ai.google.dev/gemini-api/docs/speech-generation)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-js/)

---

**Made with ❤️ for hands-free learning**

