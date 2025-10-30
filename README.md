# Frontend Toolkit Submodules Configuration - Quick Guide

## Architecture
Shared components live in frontend-toolkit repo
Each project includes it as shared/ submodule
All projects share the same UI components, functions, types, classes, hooks, utilities etc to avoid any form of duplication

## New Project Setup
# 1. Create Next.js project
npx create-next-app@latest project-name --typescript --tailwind --eslint --app
# App router (recommended)

# 2. Add shared toolkit
git submodule add https://github.com/UnifiedbeezTemp/frontend-toolkit.git shared

# 3. Install shared dependencies
npm install class-variance-authority clsx tailwind-merge @radix-ui/react-slot framer-motion @reduxjs/toolkit react-redux

## New Developer Setup
# Clone project
git clone <project-url>
cd project-name

# Get shared components
git submodule update --init --recursive

# Install & run
npm install
npm run dev

## Daily Workflow
### Using Shared Components
import { Button } from '@/shared/src/components/ui/button';

### Updating Shared Components
# 1. Edit shared code
cd shared/
# Make changes...

# 2. Push to shared repo
git add .
git commit -m "Update button style"
git push origin main

# 3. Update project reference
cd ..
git add shared
git commit -m "Update shared to latest"
git push origin main

### Getting Updates
# Safe: Get expected versions
git submodule update --init --recursive

# Risky: Get latest versions  
git submodule update --remote shared

## Important Rules
DO:
Work in project/shared/ directory
Test changes in your project before pushing
Push both shared repo AND project

DON'T:
Edit shared repo outside your project
Forget to update submodule references
Push without testing

## Need Help?
Stuck? Run git submodule update --init --recursive
Broken? Delete shared/ and re-add submodule
Confused? Ask team before pushing shared changes

Remember: Shared changes affect ALL projects. Test thoroughly!
DO NOT PUSH DIRECTLY TO MAIN BRANCH!