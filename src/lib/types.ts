export type Person = {
  id: string
  name: string
  avatar: string
  clicked: number
}

export type AppStore = {
  members: Person[]
}
