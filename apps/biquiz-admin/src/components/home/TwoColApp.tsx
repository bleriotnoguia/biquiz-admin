import Link from 'next/link'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-50">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Interactive Learning',
    description: 'Engaging and interactive platform to learn the Bible in a fun and enjoyable manner.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-50">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Verified Sources',
    description: 'All quiz content is carefully verified for credibility and biblical accuracy.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-50">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Varied Content',
    description: 'Comprehensive coverage of different books, themes, and aspects of the Bible.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-indigo-50">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Score Tracking',
    description: 'Track progress and assess knowledge with a built-in scoring system after each quiz.',
  },
]

export default function TwoColApp() {
  return (
    <section className="container mx-auto px-6 xl:px-0 py-16 lg:py-24">
      <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="w-full lg:w-1/2">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            Bible Quiz App
          </div>
          <h2 className="mt-4 text-4xl font-bold leading-snug tracking-tight text-gray-900 lg:text-5xl dark:text-white">
            Learn the Bible,{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">one quiz</span>
              <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-indigo-200 dark:bg-indigo-800 opacity-60" />
            </span>{' '}
            at a time.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            Biquiz is a Bible quiz app that helps you learn scripture in a fun and interactive way.
            Explore biblical content and deepen your knowledge through engaging quizzes.
          </p>

          <div className="mt-10 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/50">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column – app preview */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 blur-2xl opacity-70" />
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-2xl">
              <iframe
                src="https://biquiz-app.vercel.app/"
                width={375}
                height={667}
                title="Biquiz App preview"
                className="block"
              />
            </div>
          </div>

          <Link
            target="_blank"
            href="https://biquiz-app.vercel.app/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Full Screen
          </Link>
        </div>
      </div>
    </section>
  )
}
