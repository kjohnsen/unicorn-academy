# Unicorn Customization Specification

## Overview
This document details the features and attributes available in the Unicorn Customization Modal. This interface allows users to personalize the look and identity of each unicorn in their stable.

## Customization Attributes

### 1. Coat Color
- **Description**: The primary base color of the unicorn's body.
- **Input Type**: Interactive color picker.
- **Preview Behavior**: Real-time visual update of the unicorn's main body.

### 2. Mane Color
- **Description**: The color of the unicorn's mane and tail (replacing the previous 'marking' or 'horn' color inputs to better fit the new design).
- **Input Type**: Interactive color picker.
- **Preview Behavior**: Real-time visual update of the mane and tail elements.

### 3. Hind Leg Symbol (Cutie Mark)
- **Description**: A magical emblem or icon located on the unicorn's hind leg, expressing its unique personality or magical talent (similar to My Little Pony).
- **Input Type**: A visual grid/selector of available symbol options.
- **Proposed Symbols**: 
  - ⭐️ Star
  - 💖 Heart
  - ⚡️ Lightning Bolt
  - 🌙 Crescent Moon
  - 💎 Diamond
  - 🌸 Flower
- **Preview Behavior**: The chosen symbol instantly appears on the hind quarter of the unicorn in the preview window.

## UI / UX Considerations
- **Layout**: The modal should feature a split-screen design: controls (color pickers, symbol selectors) on one side, and a large, dynamic live-preview of the unicorn on the other.
- **Glassmorphism**: Ensure the modal continues to use the premium glassmorphism design system defined in `app.css`.
- **Live State**: Any adjustments should instantly bind to the Svelte 5 `$state`, updating both the modal preview and the stable list view concurrently.
