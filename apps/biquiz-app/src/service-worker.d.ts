declare global {
  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: Array<{
      url: string
      revision?: string | null
    }>
  }
}

export {}
