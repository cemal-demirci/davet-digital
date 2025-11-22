#!/bin/bash

# Update all JSX files to use config.js instead of hardcoded API_URL

FILES=(
  "client/src/pages/Signup.jsx"
  "client/src/pages/GuestUpload.jsx"
  "client/src/pages/Gallery.jsx"
  "client/src/pages/Timeline.jsx"
  "client/src/pages/RSVP.jsx"
  "client/src/pages/LiveWall.jsx"
  "client/src/pages/GuestGalleryView.jsx"
  "client/src/components/GiftManager.jsx"
  "client/src/components/MessageManager.jsx"
  "client/src/components/TimelineManager.jsx"
  "client/src/components/GuestGallery.jsx"
  "client/src/components/RSVPManager.jsx"
  "client/src/components/QRManager.jsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."

    # Remove the old API_URL line
    sed -i '' '/^const API_URL = /d' "$file"

    # Add the import statement after the last import
    if ! grep -q "import { API_URL } from" "$file"; then
      # Find the last import line number
      last_import_line=$(grep -n "^import " "$file" | tail -1 | cut -d: -f1)

      if [ ! -z "$last_import_line" ]; then
        # Determine the correct relative path based on file location
        if [[ "$file" == *"/pages/"* ]]; then
          sed -i '' "${last_import_line}a\\
import { API_URL } from '../config'
" "$file"
        elif [[ "$file" == *"/components/"* ]]; then
          sed -i '' "${last_import_line}a\\
import { API_URL } from '../config'
" "$file"
        fi
      fi
    fi

    echo "✓ Updated $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo ""
echo "All files updated successfully!"
