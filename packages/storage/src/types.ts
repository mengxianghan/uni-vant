type expires = number | Date | null

export interface IOptions {
  namespace?: string
  expires?: expires
}

export interface IAttrs {
  expires?: expires
}

export interface IStorage {
  setItem: (key: string, value: any, attrs?: IAttrs) => void
  getItem: (key: string, defaultValue?: unknown) => any
  removeItem: (key: string) => void
  clear: () => void
}
