import React from 'react'

const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-700/30" />
        <div className="absolute left-1/3 top-1/2 h-40 w-40 rounded-full bg-pink-200 blur-3xl dark:bg-pink-700/20" />
      </div>
      <div className="relative flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 px-8 py-7 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400/25" />
          <span className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Loading your dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Please wait a moment...</p>
      </div>
    </div>
  )
}

export default Loading
