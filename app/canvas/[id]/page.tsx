"use client"

import { useParams } from "next/navigation"
import { SimpleCanvas } from "@/components/simple-canvas"

export default function CanvasPage() {
  const params = useParams()
  const sceneId = params.id as string

  return <SimpleCanvas sceneId={sceneId} />
}
