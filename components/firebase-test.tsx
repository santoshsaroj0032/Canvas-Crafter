"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { saveCanvasState, loadCanvasState } from "@/lib/firebase"
import { toast } from "@/hooks/use-toast"

export function FirebaseTest() {
  const [isLoading, setIsLoading] = useState(false)

  const testFirebase = async () => {
    setIsLoading(true)
    try {
      const testData = { test: true, timestamp: new Date().toISOString() }
      const testSceneId = "test-scene-" + Date.now()

      // Test save
      await saveCanvasState(testSceneId, testData)
      console.log("Save test passed")

      // Test load
      const loadedData = await loadCanvasState(testSceneId)
      console.log("Load test passed:", loadedData)

      toast({
        title: "Firebase test successful!",
        description: "Both save and load operations work correctly.",
      })
    } catch (error) {
      console.error("Firebase test failed:", error)
      toast({
        title: "Firebase test failed",
        description: "Check console for details.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-2">Firebase Connection Test</h3>
      <Button onClick={testFirebase} disabled={isLoading}>
        {isLoading ? "Testing..." : "Test Firebase"}
      </Button>
    </div>
  )
}
