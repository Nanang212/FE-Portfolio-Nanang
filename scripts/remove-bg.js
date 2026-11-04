import sharp from 'sharp';
import fs from 'fs';

async function removeWhiteBackground(inputPath, outputPath) {
    const image = sharp(inputPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    
    // Create an RGBA buffer
    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
        rgba[i * 4] = data[i * channels];
        rgba[i * 4 + 1] = data[i * channels + 1];
        rgba[i * 4 + 2] = data[i * channels + 2];
        rgba[i * 4 + 3] = 255;
    }

    // Helper to get index
    const getIdx = (x, y) => (y * width + x) * 4;

    // Check if a pixel is near-white (background)
    const isBackgroundCandidate = (x, y) => {
        const idx = getIdx(x, y);
        const r = rgba[idx];
        const g = rgba[idx + 1];
        const b = rgba[idx + 2];
        // Background in studio shots is usually R > 230, G > 230, B > 230, and low color variance
        return r > 230 && g > 230 && b > 230 && Math.abs(r - g) < 20 && Math.abs(r - b) < 20;
    };

    // Breadth-first search flood fill from all perimeter pixels
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Seed perimeter
    for (let x = 0; x < width; x++) {
        if (isBackgroundCandidate(x, 0)) {
            visited[0 * width + x] = 1;
            queue.push([x, 0]);
        }
        if (isBackgroundCandidate(x, height - 1)) {
            visited[(height - 1) * width + x] = 1;
            queue.push([x, height - 1]);
        }
    }
    for (let y = 0; y < height; y++) {
        if (isBackgroundCandidate(0, y)) {
            visited[y * width + 0] = 1;
            queue.push([0, y]);
        }
        if (isBackgroundCandidate(width - 1, y)) {
            visited[y * width + width - 1] = 1;
            queue.push([width - 1, y]);
        }
    }

    let head = 0;
    while (head < queue.length) {
        const [cx, cy] = queue[head++];
        const cidx = getIdx(cx, cy);
        
        // Soft edge antialiasing: calculate alpha based on lightness
        const r = rgba[cidx];
        const g = rgba[cidx + 1];
        const b = rgba[cidx + 2];
        const minC = Math.min(r, g, b);
        if (minC >= 245) {
            rgba[cidx + 3] = 0; // completely transparent
        } else if (minC >= 225) {
            // soft blend
            rgba[cidx + 3] = Math.round((245 - minC) / 20 * 255);
        } else {
            rgba[cidx + 3] = 0;
        }

        // Neighbors
        const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1]
        ];

        for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nPixelIdx = ny * width + nx;
                if (!visited[nPixelIdx]) {
                    if (isBackgroundCandidate(nx, ny)) {
                        visited[nPixelIdx] = 1;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }

    // Now write out the transparent PNG
    await sharp(rgba, {
        raw: {
            width,
            height,
            channels: 4
        }
    })
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(outputPath);

    console.log(`Saved transparent image to ${outputPath}`);
}

const input = '/Users/nanang212/.gemini/antigravity/brain/d764d5d1-5846-407d-b7b7-fb087435dcae/.user_uploaded/media_1793772174771_49f6ef89.jpg';
const output = 'public/images/profile.png';
removeWhiteBackground(input, output).catch(console.error);

