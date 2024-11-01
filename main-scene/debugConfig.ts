interface Config {
  debugMenu: boolean
  quests: boolean
  [key: string]: any // Index signature to allow dynamic property assignment
}

export let config: Config = {
  debugMenu: false,
  quests: true,
  testVersion: 'DEV',
  backendVersion: 'DEV',
  modelLoaderThreads: 50,
  triggersVisibility: false
}
