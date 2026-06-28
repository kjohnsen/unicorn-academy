# Unicorn Academy - Development Roadmap

This document outlines the upcoming features and technical improvements planned for the Unicorn Academy web application.

## Planned Features

- [x] **Browser Storage Persistence**
  - Save the application's `$state` (unicorn and girl customizations, as well as their $x,y$ positions) to the browser's `localStorage` or `sessionStorage`.
  - Automatically load and hydrate the state when the user returns to the app, ensuring their magical stable is never lost.

- [x] **Version Control & GitHub Setup**
  - Initialize a local `git` repository for the project.
  - Stage and commit the current scaffolding and custom components.
  - Push the repository to GitHub for backup and potential open-source sharing.

- [ ] **Alicorn Upgrade (Wings!)**
  - Update the `UnicornSvg.svelte` component to include beautifully designed wings.
  - Add a customization toggle or unlock mechanism in the Unicorn Editor to turn a standard unicorn into an Alicorn.

- [ ] **Interactive Riding Mechanics**
  - Implement drop-target detection during the dragging phase.
  - When a user drops a girl directly onto a unicorn, she will mount the unicorn.
  - Update the visual layout so the girl appears to be sitting on the unicorn's back, and lock their positions so they drag around the pasture as a single unit.
