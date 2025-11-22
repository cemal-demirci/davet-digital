#!/usr/bin/env python3
import re
import os

files = [
    "client/src/components/MessageManager.jsx",
    "client/src/components/GuestGallery.jsx",
    "client/src/components/TimelineManager.jsx",
    "client/src/components/QRManager.jsx",
    "client/src/components/RSVPManager.jsx",
    "client/src/components/GiftManager.jsx",
    "client/src/pages/GuestGalleryView.jsx",
    "client/src/pages/Signup.jsx",
    "client/src/pages/Timeline.jsx",
    "client/src/pages/LiveWall.jsx",
    "client/src/pages/RSVP.jsx",
    "client/src/pages/Gallery.jsx",
    "client/src/pages/GuestUpload.jsx",
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"✗ File not found: {filepath}")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # Remove the old API_URL line
    content = re.sub(r"^const API_URL = 'http://localhost:5001'\n", "", content, flags=re.MULTILINE)

    # Check if import already exists
    if "import { API_URL } from" not in content:
        # Determine the correct relative path
        if "/pages/" in filepath:
            import_line = "import { API_URL } from '../config'\n"
        else:  # components
            import_line = "import { API_URL } from '../config'\n"

        # Find the last import statement
        import_pattern = r"(import .+\n)(?!import)"
        matches = list(re.finditer(import_pattern, content))

        if matches:
            last_import = matches[-1]
            # Insert after the last import
            insert_pos = last_import.end()
            content = content[:insert_pos] + import_line + content[insert_pos:]

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"✓ Updated {filepath}")

print("\n✅ All files updated successfully!")
