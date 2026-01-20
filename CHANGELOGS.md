# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Fixed
- **Performance** - Optimized bouncing hobbies animation with visibility detection and cached container sizes
