import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const source = 'public/assets/games'
const output = `${source}/optimized`
await mkdir(output, { recursive: true })

for (let id = 1; id <= 13; id += 1) {
  const name = String(id).padStart(2, '0')
  await sharp(`${source}/${id}.jpeg`)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .avif({ quality: 62, effort: 5 })
    .toFile(`${output}/game-${name}.avif`)
}

async function writeTransparentIcon(filename, destination, crop) {
  const { data, info } = await sharp(`${source}/${filename}`)
    .extract(crop)
    .resize({ width: 144, height: 144, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const pixelCount = width * height
  const queue = new Uint32Array(pixelCount)
  const visited = new Uint8Array(pixelCount)
  let head = 0
  let tail = 0
  const enqueue = (index) => {
    if (visited[index]) return
    visited[index] = 1
    const offset = index * channels
    if (Math.max(data[offset], data[offset + 1], data[offset + 2]) > 72) return
    queue[tail] = index
    tail += 1
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x)
    enqueue((height - 1) * width + x)
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width)
    enqueue(y * width + width - 1)
  }

  while (head < tail) {
    const index = queue[head]
    head += 1
    const x = index % width
    const y = Math.floor(index / width)
    const offset = index * channels
    data[offset + 3] = 0
    if (x > 0) enqueue(index - 1)
    if (x < width - 1) enqueue(index + 1)
    if (y > 0) enqueue(index - width)
    if (y < height - 1) enqueue(index + width)
  }

  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(`${output}/${destination}`)
}

await writeTransparentIcon('multi_token.jpeg', 'token-icon.png', { left: 80, top: 70, width: 1100, height: 610 })
await writeTransparentIcon('game_coin.jpeg', 'game-coin.png', { left: 0, top: 0, width: 1254, height: 1254 })
await writeTransparentIcon('multi_VEs.jpeg', 'ves-icon.png', { left: 0, top: 0, width: 1536, height: 1024 })
await writeTransparentIcon('multi_SVEs.jpeg', 'sves-icon.png', { left: 0, top: 0, width: 1448, height: 1086 })
await writeTransparentIcon('multi_gems.jpeg', 'gems-icon.png', { left: 0, top: 0, width: 1536, height: 1159 })
await writeTransparentIcon('signle_spin.jpeg', 'spins-icon.png', { left: 0, top: 0, width: 1536, height: 1024 })

console.log(`Prepared 13 AVIF banners and 6 transparent reward icons in ${output}.`)