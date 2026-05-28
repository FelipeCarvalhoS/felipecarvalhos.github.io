import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = './unoptimized/'
const outputDir = './optimized/'

fs.mkdirSync(outputDir, { recursive: true })

const MAX_WIDTH = 32 // change this
const QUALITY = 70 // like Squoosh slider

let i = 0

for (const file of fs.readdirSync(inputDir)) {
    const inputPath = path.join(inputDir, file)

    // skip non-images if needed
    if (!/\.(jpg|jpeg|png|svg)$/i.test(file)) continue

    const name = path.parse(file).name

    await sharp(inputPath)
        // .resize({ width: MAX_WIDTH }) // keeps aspect ratio
        // .toFormat('webp', { quality: QUALITY })
        .rotate(90)
        .toFile(path.join(outputDir, `${name}.jpg`))

    console.log(`✔ ${file}`)
    i++
}

console.log(`Done! ${i} images optimized.`)
