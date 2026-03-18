"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

export function SafeImage(props: ImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return null
  }

  return <Image {...props} onError={() => setHasError(true)} />
}
