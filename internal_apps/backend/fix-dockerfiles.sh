#!/bin/bash
# fix-dockerfiles.sh

# Find all Dockerfiles in apps/
for dockerfile in apps/*/Dockerfile; do
  echo "Fixing $dockerfile"
  # Replace ../../package.json with package.json
  sed -i '' 's|../../package.json|package.json|g' "$dockerfile"
  # Replace ../../package-lock.json with package-lock.json
  sed -i '' 's|../../package-lock.json|package-lock.json|g' "$dockerfile"
  # Replace COPY ../.. . with COPY . .
  sed -i '' 's|COPY ../.. .|COPY . .|g' "$dockerfile"
done

echo "Done fixing Dockerfiles."
