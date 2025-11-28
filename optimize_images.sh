#!/bin/bash

# Image Optimization Script for Parkito Web
# This script resizes and optimizes oversized WebP images

set -e

echo "🖼️  Starting image optimization..."

cd "$(dirname "$0")/public"

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp is not installed. Install it with: brew install webp"
    exit 1
fi

# Backup original images
BACKUP_DIR="../image_backups_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Creating backup in $BACKUP_DIR..."

# Function to optimize image
optimize_image() {
    local input=$1
    local max_width=$2
    local quality=${3:-82}
    local temp_file="${input}.tmp.webp"
    
    echo "  Processing: $input (max width: ${max_width}px, quality: ${quality}%)"
    
    # Backup original
    cp "$input" "$BACKUP_DIR/"
    
    # Convert to PNG first (for better processing), resize, then back to WebP
    dwebp "$input" -o "${input}.png" 2>/dev/null || {
        echo "  ⚠️  Skipping $input (conversion failed)"
        return
    }
    
    # Get current dimensions
    local current_width=$(sips -g pixelWidth "${input}.png" | tail -1 | awk '{print $2}')
    
    if [ "$current_width" -gt "$max_width" ]; then
        # Resize maintaining aspect ratio
        sips -Z "$max_width" "${input}.png" --out "${input}.resized.png" >/dev/null
        cwebp -q "$quality" "${input}.resized.png" -o "$temp_file"
        rm "${input}.resized.png"
    else
        # Just optimize without resizing
        cwebp -q "$quality" "${input}.png" -o "$temp_file"
    fi
    
    # Replace original
    mv "$temp_file" "$input"
    rm "${input}.png"
    
    # Show size reduction
    local new_size=$(du -h "$input" | cut -f1)
    echo "  ✅ Optimized: $input → $new_size"
}

echo ""
echo "🔧 Optimizing city images (target: 1920px width)..."
[ -f "levanto.webp" ] && optimize_image "levanto.webp" 1920 80
[ -f "santamargheritaligure.webp" ] && optimize_image "santamargheritaligure.webp" 1920 80
[ -f "camogli.webp" ] && optimize_image "camogli.webp" 1920 82
[ -f "milano.webp" ] && optimize_image "milano.webp" 1920 82
[ -f "laspezia.webp" ] && optimize_image "laspezia.webp" 1920 82
[ -f "parkitotorino.webp" ] && optimize_image "parkitotorino.webp" 800 82

echo ""
echo "🔧 Optimizing large images..."
[ -f "about.webp" ] && optimize_image "about.webp" 800 82

echo ""
echo "🔧 Optimizing team photos (target: 400px)..."
[ -f "benedetta.webp" ] && optimize_image "benedetta.webp" 400 85
[ -f "davide.webp" ] && optimize_image "davide.webp" 400 85
[ -f "filippo.webp" ] && optimize_image "filippo.webp" 400 85
[ -f "marco.webp" ] && optimize_image "marco.webp" 400 85

echo ""
echo "✨ Image optimization complete!"
echo "📊 Checking final sizes..."
echo ""

# Show final sizes of optimized images
du -sh levanto.webp santamargheritaligure.webp camogli.webp milano.webp laspezia.webp about.webp parkitotorino.webp benedetta.webp davide.webp filippo.webp marco.webp 2>/dev/null | sort -h

echo ""
echo "✅ Done! Original images backed up to: $BACKUP_DIR"
