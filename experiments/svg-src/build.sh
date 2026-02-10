#!/bin/bash
#
# Build production SVGs from source files
#
# Usage:
#   ./build.sh                    # Build all *.src.svg files
#   ./build.sh braid-timeline     # Build specific file
#
# Requirements:
#   - svgo (npm install -g svgo)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/.."
CONFIG="$SCRIPT_DIR/svgo.config.js"

# Check for svgo
if ! command -v svgo &> /dev/null; then
    echo "Error: svgo not found. Install with: npm install -g svgo"
    exit 1
fi

build_svg() {
    local src="$1"
    local name=$(basename "$src" .src.svg)
    local out="$OUTPUT_DIR/$name.svg"

    echo "Building: $name.src.svg -> ../$name.svg"
    svgo "$src" -o "$out" --config "$CONFIG"

    # Show size comparison
    local src_size=$(wc -c < "$src" | tr -d ' ')
    local out_size=$(wc -c < "$out" | tr -d ' ')
    local savings=$((100 - (out_size * 100 / src_size)))
    echo "  Source: ${src_size}b -> Output: ${out_size}b (${savings}% smaller)"
}

# Build specific file or all
if [ -n "$1" ]; then
    src="$SCRIPT_DIR/$1.src.svg"
    if [ -f "$src" ]; then
        build_svg "$src"
    else
        echo "Error: $src not found"
        exit 1
    fi
else
    # Build all source files
    shopt -s nullglob
    sources=("$SCRIPT_DIR"/*.src.svg)

    if [ ${#sources[@]} -eq 0 ]; then
        echo "No *.src.svg files found in $SCRIPT_DIR"
        exit 0
    fi

    for src in "${sources[@]}"; do
        build_svg "$src"
    done
fi

echo "Done."
