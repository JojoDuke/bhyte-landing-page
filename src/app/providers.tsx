'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

// Log at the very top of the client bundle to see exactly what the bundler sees
if (typeof window !== 'undefined') {
  const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  console.log("POSTHOG BUNDLE LOADED - ENV CHECK:", {
    TOKEN_EXISTS: !!process.env.NEXT_PUBLIC_POSTHOG_TOKEN,
    PROJECT_TOKEN_EXISTS: !!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    HOST: host
  });

  if (token) {
    posthog.init(token, {
      api_host: host,
      person_profiles: 'always',
      capture_pageview: false, 
      capture_pageleave: true,
      // @ts-ignore
      defaults: '2026-01-30' // Based on your documentation screenshot
    })
  }
}

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
    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
              <PostHogPageview />
            </Suspense>
            {children}
        </PHProvider>
    )
}
