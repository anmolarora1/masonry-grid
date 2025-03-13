# Photo Grid Gallery

A responsive photo gallery featuring a beautiful masonry grid layout and real-time search functionality. The app uses the Pexels API to fetch high-quality photos and provides a seamless single-page application (SPA) experience.

## Lighthouse Scores

| Metric         | Score |
| -------------- | ----- |
| Performance    | 96    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

## Features

- Responsive masonry grid layout that adapts to screen size
- Real-time search functionality with URL synchronization
- Beautiful photo display with optimized loading
- Virtualized rendering for smooth scrolling
- Shareable URLs for both search results and individual photos

## Technical Implementation

- **React Router**: For URL-based navigation and state management
- **Styled Components**: For styled and maintainable CSS
- **Custom Hooks**: For reusable logic and state management
- **Virtualization**: For efficient rendering of large photo sets
- **Responsive Design**: For optimal viewing on all devices

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Pexels API key:
   ```
   REACT_APP_PEXELS_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Environment Requirements

- Node.js 14 or higher
- npm 6 or higher
- Modern web browser with JavaScript enabled

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Design Decisions

### Single Page Application (SPA) Architecture

The app is designed as a true SPA, with the following key decisions:

1. **Modal-based Photo Viewing**:

   - Photos are displayed in a modal overlay
   - Users can quickly return to browsing without full page navigation

2. **URL-based State Management**:
   - Search queries are reflected in the URL (e.g., `?q=nature`)
   - Individual photos can be shared via URL (e.g., `?photo=123`)
   - Browser history is preserved for back/forward navigation

### Performance Considerations

1. **Virtualization**:

   - Only renders photos currently in view
   - Maintains smooth scrolling performance

2. **Image Loading**:
   - Lazy loading for off-screen images
   - Progressive loading of image sizes

## Future Improvements

- Better testing coverage
- Enhanced caching strategies
- User accounts and favorites
- Additional filtering options
- Improved accessibility features
