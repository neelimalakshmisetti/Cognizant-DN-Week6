#!/bin/bash

# Git Workflow Script
# Exercise: Demonstrates common Git commands and workflows

echo "=== Git Workflow Demo ==="

# Initialize a new repository
echo "1. Initializing repository..."
git init demo-repo
cd demo-repo

# Create a README file
echo "2. Creating README.md..."
echo "# Demo Repository" > README.md
echo "This is a demo repository for Git workflow practice." >> README.md

# Stage and commit
echo "3. Staging and committing files..."
git add README.md
git commit -m "Initial commit: Add README"

# Create a feature branch
echo "4. Creating feature branch..."
git checkout -b feature/new-feature

# Make changes
echo "5. Making changes on feature branch..."
echo "## New Feature" >> README.md
echo "This feature adds new functionality." >> README.md

# Commit changes
git add README.md
git commit -m "Add new feature documentation"

# Switch back to main
echo "6. Switching back to main branch..."
git checkout main

# Merge feature branch
echo "7. Merging feature branch..."
git merge feature/new-feature

# Create another branch for bugfix
echo "8. Creating bugfix branch..."
git checkout -b bugfix/fix-typo

# Fix typo
echo "9. Fixing typo..."
sed -i '' 's/This is a demo/This is a demo repository/' README.md

# Commit bugfix
git add README.md
git commit -m "Fix typo in README"

# Merge bugfix
git checkout main
git merge bugfix/fix-typo

# View commit history
echo "10. Viewing commit history..."
git log --oneline

# Clean up
cd ..
rm -rf demo-repo

echo "=== Git Workflow Demo Complete ==="
