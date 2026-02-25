#!/usr/bin/env python3
"""
Image optimization script for the portfolio website.
Compresses JPG/PNG files and converts PNGs to WebP for better performance.
"""

from PIL import Image
import os
from pathlib import Path

def optimize_image(input_path, output_path=None, max_width=2400, quality=75):
    """Optimize a single image for web."""
    try:
        img = Image.open(input_path)
        
        # Resize if too large
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Handle output path
        if output_path is None:
            output_path = input_path
        
        # Save based on format
        if input_path.lower().endswith('.png'):
            # Convert PNG to WebP for better compression
            webp_path = output_path.replace('.png', '.webp')
            img.save(webp_path, 'WEBP', quality=quality)
            print(f"✓ Converted {Path(input_path).name} → {Path(webp_path).name}")
            return webp_path
        else:
            # Compress JPG
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            print(f"✓ Optimized {Path(input_path).name}")
            return output_path
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return None

# Define image optimization targets
images_to_optimize = [
    # Large hero image - reduce quality more aggressively
    ('src/assets/hero-mojave-small.jpg', None, 2400, 70),
    # Profile images
    ('public/profile-curved.png', None, 800, 75),
    ('public/profile-podium-curved.png', None, 800, 75),
    # Logo
    ('public/turtle-logo-white.png', None, 400, 85),
    # Background images for about section
    ('public/clark-hs.jpg', None, 1000, 75),
    ('public/healy-sunflare.jpg', None, 1000, 75),
    ('public/healy-sunset.jpg', None, 1000, 75),
    ('public/car-barn.jpg', None, 1000, 75),
    ('public/social.jpg', None, 1000, 75),
    ('public/tech.jpg', None, 1000, 75),
    ('public/tree.jpg', None, 1000, 75),
]

base_dir = '/Users/michaelpasimio/Coding/portfolio-01'

print("🖼️  Starting image optimization...\n")

for input_file, output_file, max_width, quality in images_to_optimize:
    full_path = os.path.join(base_dir, input_file)
    if os.path.exists(full_path):
        optimize_image(full_path, output_file, max_width, quality)
    else:
        print(f"⚠️  File not found: {full_path}")

print("\n✅ Image optimization complete!")
