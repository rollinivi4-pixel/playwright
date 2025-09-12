# Video Recording Sample Tests

This folder contains sample tests that demonstrate video recording capabilities in Playwright, based on the login test scenarios.

## Video Recording Configuration

Video recording is already enabled in `playwright.config.js`:

```javascript
use: {
  video: 'on',  // Records video for ALL tests (pass or fail)
  headless: false,  // Makes browser visible
  slowMo: 1000,    // Slows down actions by 1 second
}
```

## Test Files

### `video-recording-sample.spec.js`

Contains 5 different video recording test scenarios:

1. **Complete Login Flow** - Records the entire successful login process
2. **Error Scenario** - Records login with wrong password
3. **Forgot Password Flow** - Records the complete forgot password process
4. **Interactive Form Filling** - Records step-by-step form interactions with delays
5. **Page Navigation** - Records various page interactions and scrolling

## Running Video Recording Tests

### Run all video recording tests:
```bash
npx playwright test login/video_recording/
```

### Run specific test:
```bash
npx playwright test login/video_recording/video-recording-sample.spec.js
```

### Run with specific browser:
```bash
npx playwright test login/video_recording/ --project=chromium
```

## Video Output Location

Videos are automatically saved in the `test-results/` folder with the following structure:

```
test-results/
├── video-recording-sample-complete-login-flow-with-video-recording-chromium/
│   └── video.webm
├── video-recording-sample-login-with-wrong-password-error-scenario-video-chromium/
│   └── video.webm
└── ...
```

## Video Recording Features

### Automatic Recording
- Videos are recorded automatically for all tests
- No additional configuration needed
- Works for both passing and failing tests

### Visual Enhancements
- `headless: false` - Browser is visible during recording
- `slowMo: 1000` - Actions are slowed down for better visibility
- Strategic `waitForTimeout()` calls for better video flow

### Video Quality
- Videos are saved in WebM format
- High quality recording
- Includes all browser interactions

## Test Scenarios Explained

### 1. Complete Login Flow
- Records the entire login process step by step
- Shows form filling, checkbox interaction, and login button click
- Includes verification of successful login

### 2. Error Scenario
- Records what happens with wrong credentials
- Shows error handling and page state
- Useful for debugging login issues

### 3. Forgot Password Flow
- Records the complete forgot password process
- Shows link detection and navigation
- Demonstrates error recovery flow

### 4. Interactive Form Filling
- Records character-by-character typing
- Shows hover effects and visual feedback
- Demonstrates realistic user interaction

### 5. Page Navigation
- Records scrolling and page interactions
- Shows element hovering and navigation
- Demonstrates various UI interactions

## Best Practices for Video Recording

1. **Use Strategic Delays**: Add `waitForTimeout()` at key moments
2. **Show Interactions**: Use `hover()` before clicking elements
3. **Character-by-Character Typing**: For realistic form filling
4. **Scroll and Navigate**: Show page interactions
5. **Error Scenarios**: Record both success and failure cases
6. **Clear Console Logs**: Use descriptive console messages

## Video Playback

Videos can be played in:
- Web browsers (Chrome, Firefox, Edge)
- Video players that support WebM format
- Playwright HTML report (automatically includes videos)

## Troubleshooting

### Videos not recording?
- Check `playwright.config.js` has `video: 'on'`
- Ensure `headless: false` is set
- Check test-results folder permissions

### Poor video quality?
- Increase `slowMo` value for slower actions
- Add more `waitForTimeout()` calls
- Use `fullPage: true` for screenshots if needed

### Large video files?
- Videos are compressed automatically
- Consider reducing test duration
- Use `video: 'retain-on-failure'` to only keep failed test videos
