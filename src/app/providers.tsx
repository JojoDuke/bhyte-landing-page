'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString()
      }

      posthog.capture("$pageview", { $current_url: url })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

      console.log("PostHog initialized with token:", !!token);

      if (token) {
        posthog.init(token, {
          api_host: host || 'https://us.i.posthog.com',
          person_profiles: 'always',
          capture_pageview: false, // Handled manually above for better route accuracy
          capture_pageleave: true,
        })
      }
    }, [])

    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
              <PostHogPageview />
            </Suspense>
            {children}
        </PHProvider>
    )
}
