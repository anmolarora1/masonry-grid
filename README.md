# Photo Grid Gallery

A responsive photo gallery built with React, featuring a beautiful masonry grid layout and real-time search functionality. The app uses the Pexels API to fetch high-quality photos and provides a seamless single-page application (SPA) experience.

## Features

- Responsive masonry grid layout that adapts to screen size
- Real-time search functionality with URL synchronization
- Beautiful photo display with optimized loading
- Virtualized rendering for smooth scrolling
- Shareable URLs for both search results and individual photos
- Modern, clean UI with smooth transitions

## Technical Implementation

- **React Router**: For URL-based navigation and state management
- **Styled Components**: For styled and maintainable CSS
- **Custom Hooks**: For reusable logic and state management
- **Virtualization**: For efficient rendering of large photo sets
- **Responsive Design**: For optimal viewing on all devices

## Performance Optimizations

- Virtualized rendering to handle large photo sets
- Debounced search to prevent excessive API calls
- Lazy loading of images
- Efficient state management with React hooks
- Optimized masonry layout calculations

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
- `npm run eject`: Ejects from Create React App

## Design Decisions

### Single Page Application (SPA) Architecture

The app is designed as a true SPA, with the following key decisions:

1. **Modal-based Photo Viewing**:

   - Photos are displayed in a modal overlay instead of separate routes
   - This provides a smoother, more app-like experience
   - Users can quickly return to browsing without full page navigation

2. **URL-based State Management**:

   - Search queries are reflected in the URL (e.g., `?q=nature`)
   - Individual photos can be shared via URL (e.g., `?photo=123`)
   - Browser history is preserved for back/forward navigation

3. **State Preservation**:
   - Grid position and scroll state are maintained during photo viewing
   - Search results remain visible when closing a photo
   - Smooth transitions between states

### Performance Considerations

1. **Virtualization**:

   - Only renders photos currently in view
   - Handles large photo sets efficiently
   - Maintains smooth scrolling performance

2. **Image Loading**:

   - Lazy loading for off-screen images
   - Progressive loading of image sizes
   - Caching of loaded images

3. **State Management**:
   - Efficient updates to prevent unnecessary re-renders
   - Memoized calculations for layout
   - Optimized event handlers

## Future Improvements

Here are some things I'd love to add if I had more time:

### Better Testing

- Unit tests for hooks and utilities
- Integration tests for API interactions
- End-to-end tests for critical user flows

### Performance Enhancements

- Image preloading for smoother transitions
- Better caching strategies
- Performance monitoring and analytics

### New Features

- Let users save their favorite photos
- Add filters for photo attributes
- Support for different grid layouts
- Keyboard navigation
- Touch gestures for mobile

### Developer Experience

- Better error handling and recovery
- More comprehensive documentation
- Development tools and debugging helpers

### UX Improvements

- Better loading states and animations
- More intuitive search suggestions
- Enhanced accessibility features
- Better mobile experience
