# 💕 Lovelly - Our Love Story Website

A beautiful, personalized love story website with password protection and admin panel. Perfect for anniversaries, proposals, or special occasions.

## 🌐 Live Demo
**Visit your website:** https://yousefnegm393-commits.github.io/lovelly.github.io

## Features ✨

### Public Features
- 🔐 **Password Protected**: Private access with passcode authentication
- 💬 **Story Content**: Display personalized love story with text and images
- ⏰ **Countdown Timer**: Countdown to a special date with days, hours, minutes, and seconds
- 🎵 **Background Music**: Add romantic background music
- 🎨 **Beautiful Effects**: Animated particles and smooth transitions
- 📱 **Responsive Design**: Works perfectly on mobile and desktop

### Admin Features
- ✏️ **Edit Everything**: Change story title, text, and images anytime
- 🎨 **Customize Background**: 
  - Solid colors
  - Background images
  - Videos
  - Gradient effects
- ⭐ **Particle Effects**: Toggle animated particles on/off
- 🎵 **Music Management**: Update and test background music
- ⏰ **Countdown Settings**: Change target date and message
- 🔒 **Security**: Change passcode anytime

## Getting Started 🚀

### Quick Start
1. **Open the website**: https://yousefnegm393-commits.github.io/lovelly.github.io
2. **Enter passcode**: `1234`
3. **Click ⚙️ Admin button** to customize everything

## How to Customize 🎨

### Change the Passcode
1. Open the website and enter "1234"
2. Click the ⚙️ Admin button
3. Scroll to "Security" section
4. Enter new passcode
5. Click "Save All Changes"

### Add Your Love Story
1. Click ⚙️ Admin button
2. Under "Story Content":
   - Edit the title
   - Write your story:
     - Use `|` to separate lines within a paragraph
     - Use `||` to separate different paragraphs
   - Add image URLs (one per line)
3. Click "Save All Changes"

### Example Story Format
```
Once upon a time, we met on a beautiful day|and everything changed.
||Our love grew stronger with each passing moment|and we knew we were meant to be together.
||Every moment with you is magical.|Forever is not long enough.
```

### Set the Countdown Date
1. Click ⚙️ Admin button
2. Under "Countdown Settings":
   - Set the "Target Date"
   - Edit the countdown title
   - Set the message to show when countdown ends
3. Click "Save All Changes"

### Customize Background
1. Click ⚙️ Admin button
2. Under "Background & Effects":
   - Choose background type:
     - **Solid Color**: Pick any color
     - **Image**: Paste image URL
     - **Video**: Paste video URL (must be .mp4)
     - **Gradient**: Create gradient (e.g., `to right, #ff0000, #0000ff`)
3. Toggle particles effect
4. Click "Save All Changes"

### Add Music
1. Get music URL (from sites like Pixabay, YouTube, or your own hosting)
2. Click ⚙️ Admin button
3. Paste the URL in "Music URL" field
4. Click "Test Music" to preview
5. Click "Save All Changes"

## File Structure 📂

```
lovelly.github.io/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Data Storage 💾

All data is stored in your browser's **localStorage**. This means:
- ✅ Data persists after refresh
- ✅ No server needed
- ✅ Completely private
- ✅ Works offline

## Browser Compatibility 🌐

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Default Settings 🎯

```
Passcode: 1234
Title: Our Love Story 💕
Countdown Date: Dec 31, 2025
Background: Dark blue (#1a1a2e)
Particles: Enabled
Music: None (add your own)
```

## Tips & Tricks 💡

1. **Use high-quality images**: Compress images before using URLs
2. **Free image hosting**: Use [Imgur](https://imgur.com) or [Cloudinary](https://cloudinary.com)
3. **Free music**: Get royalty-free music from [Pixabay](https://pixabay.com/music/)
4. **Video backgrounds**: Use short, looping videos from [Pexels](https://www.pexels.com/videos/)
5. **Preview changes**: Always test music and images before finalizing

## Troubleshooting 🔧

### Music won't play
- Check URL is valid and accessible
- Some browsers require user interaction first
- Use direct file links, not streaming URLs

### Images not showing
- Verify image URL is correct
- Check for CORS issues (use different hosting if needed)
- Ensure file format is supported (JPG, PNG, GIF, WebP)

### Changes not saving
- Check browser's localStorage is enabled
- Clear browser cache and try again
- Use a different browser if problem persists

## Security Notes 🔒

- Passcode is stored in browser's localStorage
- This is NOT for highly sensitive content
- For maximum security, always use HTTPS (your repo uses HTTPS automatically)
- Change passcode regularly

## Support & Questions ❓

For issues or questions:
1. Check this README for solutions
2. Clear browser cache and refresh
3. Test in different browser
4. Contact repository owner

---

**Made with ❤️ for love stories**
