# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Dynamic Project Pages** - Implemented dynamic routing for individual project detail pages at `/project/[alias]`
- **Project Detail Pages** - Created comprehensive project detail pages with sections for:
  - Overview with full project descriptions
  - Goals and Motivation (structured object format)
  - Tech Stack Used (pill-style display)
  - Features (bullet list format)
  - Challenges and solutions
  - Interactive gallery with image descriptions
  - Repositories section with GitHub and Live Demo links
  - Outro section for project reflections
- **Sticky Navigation** - Added minimal, classy sticky navigation sidebar for project detail pages with:
  - "On this page" header
  - Active section highlighting
  - Smooth scroll to sections
  - Auto-detection of available sections
- **Interactive Project Gallery** - Created gallery component with:
  - Horizontal scrolling layout
  - Framer Motion animations for seamless transitions
  - Full-screen image viewer with navigation
  - Image descriptions on hover and in full-screen mode
  - Keyboard navigation support
- **Project Navigation** - Added bottom navigation component with:
  - Next project button with circular navigation
  - Expandable "View All Projects" grid
  - Project cards with thumbnails and tech stack preview
- **Contact Me Button** - Added email contact button for projects without GitHub or Live URLs
- **Project List Page** - Created `/project` page displaying all enabled projects
- **Enhanced Project Data Structure** - Updated project interface to support:
  - Goals and Motivation as structured object (introduction, goals array, motivation)
  - Gallery images with descriptions
  - Features, challenges, and outro sections
  - Demo section support (removed for now)
- **Analytics Integration** - Added Umami Analytics and Google Analytics (GA4) support with environment variable configuration
- **SEO Enhancements** - Implemented comprehensive SEO improvements including:
  - Enhanced metadata with Open Graph and Twitter Card support
  - Automatic sitemap generation at `/sitemap.xml`
  - Optimized robots.txt with sitemap reference
  - JSON-LD structured data for Website, Person, and Organization schemas
- **Portfolio Components** - Added complete portfolio website structure:
  - Header component with social media links
  - Hero section with animated text reveals
  - About section with location map, music player, and interactive hobbies
  - Skills section with animated skill tags
  - Projects section with project showcase
  - Experience section with work history timeline
  - Contact section with email integration
- **Interactive Features** - Added engaging interactive elements:
  - Bouncing hobbies animation with drag-and-drop functionality
  - Music player with YouTube integration and album art display
  - Interactive map component using MapLibre GL
  - Smooth scroll animations and transitions
- **UI Components** - Created reusable UI components:
  - Transitions and animations using Framer Motion
  - Typography components with text reveal effects
  - Hover image effects
  - Parallax text scrolling
- **Configuration** - Added centralized configuration:
  - `siteConfig.json` for portfolio data management
  - Environment variable template for analytics setup
  - Analytics setup documentation
- **Styling** - Implemented dark theme with:
  - Custom CSS variables for theming
  - Glassmorphism effects
  - Custom scrollbar styling
  - Key-tile button animations

### Changed
- **Layout Structure** - Migrated from default Next.js template to full portfolio layout
- **Font** - Changed from Geist to Poppins font family
- **Global Styles** - Completely redesigned global CSS with dark theme support and custom animations
- **Next.js Config** - Added image remote patterns for external image sources
- **Projects Component** - Added `showAll` prop to control displaying all projects vs show more/less functionality
- **Project Page** - Updated `/project` page to automatically display all enabled projects without show more/less button
- **HoverImage Component** - Updated to link to individual project detail pages instead of anchor links
- **Project Data Structure** - Enhanced siteConfig.json with detailed project information including goals, features, challenges, galleries, and outros
- **Project Galleries** - Removed duplicate placeholder images from project galleries, keeping one image per project for cleaner data structure

### Fixed
- **Performance** - Optimized bouncing hobbies animation with visibility detection and cached container sizes
- **BouncingHobbies Component** - Fixed TypeScript errors and animation frame reference issues in bouncing hobbies component
- **Build Errors** - Resolved TypeScript compilation errors for animation frame refs and container ref types
- **SlideIn Component** - Fixed className merging issue by correcting cn function parameter order

### Changed
- **Gitignore** - Added `.cursor/` directory to gitignore to exclude Cursor IDE files
- **Layout Structure** - Moved LoaderWrapper from Hero component to page level for better page-wide loading experience
- **Responsive Design** - Improved mobile responsiveness across Hero, Experience, and MusicPlayer components
- **Analytics Configuration** - Updated Umami website ID and site URL to production values
