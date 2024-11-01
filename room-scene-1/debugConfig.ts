interface Config {
  triggersVisibility: false
  [key: string]: any // Index signature to allow dynamic property assignment
}

export let config: Config = {
  triggersVisibility: false
}
