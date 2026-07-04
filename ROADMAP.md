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

- [x] **Alicorn Upgrade (Wings!)**
  - Update the `UnicornSvg.svelte` component to include beautifully designed wings.
  - Add a customization toggle or unlock mechanism in the Unicorn Editor to turn a standard unicorn into an Alicorn.

- [x] **Interactive Riding Mechanics**
  - Implement drop-target detection during the dragging phase.
  - When a user drops a girl directly onto a unicorn, she will mount the unicorn.
  - Update the visual layout so the girl appears to be sitting on the unicorn's back, and lock their positions so they drag around the pasture as a single unit.

- [ ] **Location Switcher & Classroom**
  - Add a location switcher button to navigate between different scenes. The default screen is the Pasture.
  - Create a new Classroom location with a carpeted floor, no desks, a blackboard, and a teacher.
  - In the Classroom, render small versions of the girls and unicorns (baby unicorns and little girls).
  - Make the blackboard interactive: click to enlarge and open a modal where the user can draw.
  - Implement a feature where a flying baby unicorn mimics the user's chalk drawing with a 2-second delay.

- [ ] **Playground Location**
  - Create a new Playground location.
  - In the Playground, display both big and little versions of each girl and unicorn simultaneously.
