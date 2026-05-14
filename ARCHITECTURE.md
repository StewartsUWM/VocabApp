# ARCHITECTURE.md

## Vocabulary Learning Web App Architecture

### Overview

This document outlines the structure and design of the vocabulary-learning web app. The app is designed to be lightweight, fully functional offline, and user-friendly, adhering to modern web development practices.

### File Structure

The project consists of the following files and directories:

```
vocab-app
├── index.html
├── style.css
├── app.js
├── ARCHITECTURE.md
├── README.md
├── assets
│   ├── fonts
│   └── icons
└── data
    └── sample-words.json
```

### Components

1. **index.html**
   - Main HTML document.
   - Contains the structure of the app.
   - Links to `style.css` for styling and `app.js` for functionality.
   - Includes meta tags for mobile responsiveness.

2. **style.css**
   - Defines the visual appearance of the app.
   - Styles the layout, colors, fonts, and ensures mobile-friendliness.
   - Implements a clean and beginner-friendly design.

3. **app.js**
   - Contains the core JavaScript logic for the application.
   - Manages user interactions for vocabulary word management:
     - Adding, editing, deleting, and searching for words.
   - Implements local storage persistence to save user data:
     - Uses `localStorage` for data storage.
     - Automatically saves changes and restores data on page load.

4. **ARCHITECTURE.md**
   - This document, providing an overview of the app's architecture.

5. **README.md**
   - Documentation for the project.
   - Includes an overview, setup instructions, and usage guidelines.

6. **assets/**
   - Directory for static assets used in the app.
   - **fonts/**: Contains font files for the application.
   - **icons/**: Contains icon files for the app's user interface.

7. **data/**
   - Directory for data files.
   - **sample-words.json**: A sample dataset of vocabulary words in JSON format for testing and demonstration.

### Interaction Flow

- Users interact with the app through the UI defined in `index.html`.
- User actions trigger JavaScript functions in `app.js`, which manipulate the vocabulary data.
- Changes to vocabulary words are saved in `localStorage`, ensuring persistence across sessions.
- The app retrieves and displays data from `localStorage` on page load, providing a seamless user experience.

### Conclusion

This architecture provides a clear and organized structure for the vocabulary-learning web app, ensuring maintainability and ease of extension in the future. The use of modern web technologies and practices will enhance the user experience and facilitate further development.