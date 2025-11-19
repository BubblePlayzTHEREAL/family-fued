# Family Feud Game

A custom Family Feud game built with HTML, CSS, and JavaScript. Features include a beautiful interface, score tracking, strike system, and the ability to import questions from JSON files.

## Features

- 🎨 **Attractive UI**: Modern design with gradient backgrounds, animations, and responsive layout
- 📊 **Score Tracking**: Keep track of scores for two teams and round scores
- ❌ **Strike System**: Visual strike indicators with animations
- 📁 **JSON Import**: Easy question import from custom JSON files
- 🎮 **Interactive Gameplay**: Click to reveal answers, navigate between questions, and manage game flow
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Start

1. Open `index.html` in a web browser
2. Click "📁 Import Questions (JSON)" to load the sample `questions.json` file
3. Click on answer boxes to reveal them
4. Use the control buttons to manage the game

## Game Controls

### Question Navigation
- **⬅️ Previous**: Go to the previous question
- **➡️ Next**: Go to the next question
- **🔄 Reset Question**: Reset the current question (hide all answers)

### Team Controls
- **Award Team 1/2**: Give the current round score to the selected team
- **Add Strike**: Add a strike (up to 3)
- **Clear Strikes**: Remove all strikes
- **Reset All Scores**: Reset all team scores and round score

## JSON File Format

Create your own questions by following this format:

```json
{
    "questions": [
        {
            "question": "Name something you find in a kitchen",
            "answers": [
                { "text": "Refrigerator", "points": 38 },
                { "text": "Stove/Oven", "points": 24 },
                { "text": "Sink", "points": 15 }
            ]
        }
    ]
}
```

### Format Details:
- **questions**: Array of question objects
- **question**: The survey question (string)
- **answers**: Array of answer objects (1-8 answers per question)
  - **text**: The answer text (string)
  - **points**: Points value for this answer (number)

## How to Play

1. **Load Questions**: Import a JSON file with questions
2. **Reveal Answers**: Click on answer boxes to reveal them and add points to the round score
3. **Manage Strikes**: Click "Add Strike" when a team gives a wrong answer
4. **Award Points**: After all answers are revealed or 3 strikes are given, award the round score to the winning team
5. **Next Question**: Move to the next question and continue playing
6. **Track Scores**: Team scores accumulate throughout the game

## Customization

### Modify Colors
Edit `styles.css` to change the color scheme:
- Background gradients
- Button colors
- Border colors
- Score box styling

### Add More Questions
Create or edit JSON files with your own survey questions and answers.

### Adjust Layout
Modify `styles.css` to change:
- Number of answer rows displayed
- Font sizes
- Spacing and padding
- Responsive breakpoints

## Files

- `index.html` - Main game interface
- `styles.css` - All styling and animations
- `game.js` - Game logic and functionality
- `questions.json` - Sample questions (8 questions included)

## Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Open source - feel free to use and modify for your own purposes!