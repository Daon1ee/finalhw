# 🌈 Mood-based Color Palette App

## 1. Technology Stack
### Frontend
- HTML
- CSS
- TypeScript
- JSON Data Handling

### Development Environment
- Visual Studio Code
- Figma Make

### AI Assitance
- GitHub Copilot
- ChatGPT
- Figma Make

### Version Control
- GitHub Repository

## 2. API Integration
This project integrates two distinct external APIs, each returning different kinds of data and serving different purposes: 

### Color API (Color Data)
- Generates a color palette based on the user's selected mood keyword.
- Provides HEX color codes.
- Enables users to copy and reuse colors.
- Used to visually represent emotional states.

### Unsplash API (Image Data)
- Fetches mood-related images based on keyword input.
- Provides contextual background imagery that visually reinforces emotional meaning.

By combining **color palette data + image data**, the application turns the subjective concept of Emotion into
**Visualized palettes, Meaningful Imagery, Saveable/ Shareable emotional snapshots.**

This allows users to see, remember, and archive their feelings rather than only describing them in text.

## 3. Cross-Domain Data Mapping
The application transforms emotion -> data -> visual + audio multimodal experience.

### 👀Visual Data Mapping
#### Mood Keyword Button Mapping

- Color palette, Image, Emoji suggestions: When a user selects a mood keyword, the app dynamically fetches and displays 

#### Color Palette Visualization

- Displays mood-based palette with HEX codes
- Copy button available
- Palette influences UI theme and background

#### Mood → Image Mapping (Unsplash)
- Retrieves visually relevant image for each mood
- Presented as hero visual for emotional context

#### Emoji Mapping
- Provides symbolic emotional shorthand

#### Mood Journal Generator
- Generates or stores short reflections paired with mood data

#### Calendar + Mood Archiving
- Saves each journal entry by date

#### Save as Image
- Exports mood page as an image “emotional card”

#### Share Feature
- Allows sharing mood palette with others

### 🎧Audio Mapping
#### Mood-based BGM
- Converts emotional + color data into background sound
- Represents emotion through sound

- Audio Controls: Play / Pause, Volume slider, Audio description labels

## 4. User Interface & Usablity
### Intuitive Navigation
- Clear button-based mood interaction ensures users immediately understand how to use the app
- Bento-style visualization organizes mood data, color palettes, images, audio, and journal elements into modular, easy-to-scan blocks, helping users intuitively explore and engage with each feature

### Responsive Design
- Works on desktop
- Layout dynamically adapts

### Strong Visual Hierarchy
- The interface follows a clear right-left visual structure to guide user attention naturally
- The Bento-style modular layout organizes each content type into distinct, meaningful blocks
- Visual weight is controlled using size, spacing, contrast, and alignment, ensuring users can easily understand importance and flow

### Accessibility
- Color palettes influence UI accenting, but accessibility contrast standards are maintained to prevent readability issues
- Consistent typography and section labels reinforce clarity, making it easy to distinguish between data types and interactive components
