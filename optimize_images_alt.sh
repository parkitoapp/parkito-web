#!/bin/bash

# Alternative Image Optimization Script using ImageMagick
# For images that failed with dwebp

set -e

echo "🖼️  Optimizing remaining images with ImageMagick..."

cd "$(dirname "$0")/public"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed. Install it with: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp is not installed. Install it with: brew install webp"
    exit 1
fi

# Function to optimize image with ImageMagick
optimize_with_magick() {
    local input=$1
    local max_width=$2
    local quality=${3:-82}
    
    echo "  Processing: $input (max width: ${max_width}px, quality: ${quality}%)"
    
    # Convert WebP to PNG, resize, and back to WebP
    convert "$input" -resize "${max_width}x>" -quality "$quality" "${input}.temp.png"
    cwebp -q "$quality" "${input}.temp.png" -o "${input}.new"
    
    # Replace original
    mv "${input}.new" "$input"
    rm "${input}.temp.png"
    
    local new_size=$(du -h "$input" | cut -f1)
    echo "  ✅ Optimized: $input → $new_size"
}

echo ""
echo "🔧 Optimizing team photos (target: 400px)..."
[ -f "benedetta.webp" ] && optimize_with_magick "benedetta.webp" 400 85
[ -f "davide.webp" ] && optimize_with_magick "davide.webp" 400 85
[ -f "filippo.webp" ] && optimize_with_magick "filippo.webp" 400 85
[ -f "marco.webp" ] && optimize_with_magick "marco.webp" 400 85

echo ""
echo "🔧 Optimizing other large images..."
[ -f "about.webp" ] && optimize_with_magick "about.webp" 800 82
[ -f "parkitotorino.webp" ] && optimize_with_magick "parkitotorino.webp" 800 82

echo ""
echo "✨ Additional optimization complete!"
echo "📊 Final sizes:"
echo ""

du -sh levanto.webp santamargheritaligure.webp camogli.webp milano.webp laspezia.webp about.webp parkitotorino.webp benedetta.webp davide.webp filippo.webp marco.webp 2>/dev/null | sort -h

echo ""
echo "✅ Done!"
