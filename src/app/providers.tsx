"use client"
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from "next/navigation"

// Robust top-level initialization
if (typeof window !== 'undefined') {
  const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  console.log("DEBUG: PostHog Init Values", {
    tokenFound: !!token,
    host: host
  });

  if (token) {
    posthog.init(token, {
      api_host: host,
      person_profiles: 'always',
      capture_pageview: false, 
      capture_pageleave: true,
      ...({ defaults: '2026-01-30' } as Record<string, string>)
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
