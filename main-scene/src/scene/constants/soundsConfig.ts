const baseSoundPath = 'sounds/'

const soundsPath = {
  soundFountain: `${baseSoundPath}sound_water_fountain.mp3`
}

export const soundVolume: Map<string, number> = new Map([[soundsPath.soundFountain, 0.3]])

export const soundEntity = new Map([
  [soundsPath.soundFountain, ['obj_waterfall.101', 'obj_waterfall.102', 'obj_waterfall.103', 'obj_fountain.001']]
])
