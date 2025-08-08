"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Toolbar } from "./toolbar"
import { ShareDialog } from "./share-dialog"
import { saveCanvasState, loadCanvasState } from "@/lib/firebase"
import { debounce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Share2, Download, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ConnectionStatus } from "./connection-status"

interface CanvasEditorProps {
  sceneId: string
  viewOnly?: boolean
}

interface DrawingObject {
  type: "rectangle" | "circle" | "text" | "path"
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  text?: string
  color: string
  strokeColor: string
  strokeWidth: number
  path?: { x: number; y: number }[]
}

export function CanvasEditor({ sceneId, viewOnly = false }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTool, setCurrentTool] = useState<string>("select")
  const [isSaving, setIsSaving] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [objects, setObjects] = useState<DrawingObject[]>([])
  const [selectedObject, setSelectedObject] = useState<DrawingObject | null>(null)
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (objectsToSave: DrawingObject[]) => {
      if (viewOnly) return
      setIsSaving(true)
      try {
        const canvasData = { objects: objectsToSave, version: "1.0" }
        await saveCanvasState(sceneId, canvasData)
        console.log("Canvas saved successfully")
      } catch (error) {
        console.error("Failed to save canvas:", error)
        toast({
          title: "Save failed",
          description: "Failed to save your changes. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
    }, 1500),
    [sceneId, viewOnly],
  )

  // Draw all objects on canvas
  const redrawCanvas = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw all objects
    objects.forEach((obj) => {
      ctx.fillStyle = obj.color
      ctx.strokeStyle = obj.strokeColor
      ctx.lineWidth = obj.strokeWidth

      switch (obj.type) {
        case "rectangle":
          if (obj.width && obj.height) {
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
            ctx.strokeRect(obj.x, obj.y, obj.width, obj.height)
          }
          break
        case "circle":
          if (obj.radius) {
            ctx.beginPath()
            ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()
          }
          break
        case "text":
          if (obj.text) {
            ctx.font = "24px Arial"
            ctx.fillText(obj.text, obj.x, obj.y)
          }
          break
        case "path":
          if (obj.path && obj.path.length > 1) {
            ctx.beginPath()
            ctx.moveTo(obj.path[0].x, obj.path[0].y)
            obj.path.forEach((point) => {
              ctx.lineTo(point.x, point.y)
            })
            ctx.stroke()
          }
          break
      }
    })
  }, [objects])

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth - (viewOnly ? 0 : 320)
    canvas.height = window.innerHeight - 60

    // Set white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Load existing canvas data
    const loadCanvas = async () => {
      try {
        console.log("Loading canvas for scene:", sceneId)
        const canvasData = await loadCanvasState(sceneId)
        if (canvasData && canvasData.objects) {
          console.log("Canvas data found, loading...")
          setObjects(canvasData.objects)
        } else {
          console.log("No existing canvas data, starting fresh")
        }
      } catch (error) {
        console.error("Failed to load canvas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCanvas()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth - (viewOnly ? 0 : 320)
      canvas.height = window.innerHeight - 60
      redrawCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [sceneId, viewOnly, redrawCanvas])

  // Redraw canvas when objects change
  useEffect(() => {
    redrawCanvas()
    if (objects.length > 0) {
      debouncedSave(objects)
    }
  }, [objects, redrawCanvas, debouncedSave])

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (viewOnly) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentTool === "pen") {
      setIsDrawing(true)
      setCurrentPath([{ x, y }])
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || currentTool !== "pen" || viewOnly) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCurrentPath((prev) => [...prev, { x, y }])

    // Draw current path in real-time
    const ctx = canvas.getContext("2d")
    if (ctx && currentPath.length > 0) {
      ctx.strokeStyle = "#1f2937"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      const newPath: DrawingObject = {
        type: "path",
        x: currentPath[0].x,
        y: currentPath[0].y,
        color: "#1f2937",
        strokeColor: "#1f2937",
        strokeWidth: 3,
        path: currentPath,
      }
      setObjects((prev) => [...prev, newPath])
    }
    setIsDrawing(false)
    setCurrentPath([])
  }

  const addRectangle = () => {
    if (viewOnly) return
    const newRect: DrawingObject = {
      type: "rectangle",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      color: "#3b82f6",
      strokeColor: "#1e40af",
      strokeWidth: 2,
    }
    setObjects((prev) => [...prev, newRect])
    setSelectedObject(newRect)
  }

  const addCircle = () => {
    if (viewOnly) return
    const newCircle: DrawingObject = {
      type: "circle",
      x: 200,
      y: 200,
      radius: 50,
      color: "#ef4444",
      strokeColor: "#dc2626",
      strokeWidth: 2,
    }
    setObjects((prev) => [...prev, newCircle])
    setSelectedObject(newCircle)
  }

  const addText = () => {
    if (viewOnly) return
    const newText: DrawingObject = {
      type: "text",
      x: 250,
      y: 250,
      text: "Click to edit",
      color: "#1f2937",
      strokeColor: "#1f2937",
      strokeWidth: 1,
    }
    setObjects((prev) => [...prev, newText])
    setSelectedObject(newText)
  }

  const enableDrawing = () => {
    if (viewOnly) return
    setCurrentTool("pen")
  }

  const disableDrawing = () => {
    setCurrentTool("select")
  }

  const deleteSelected = () => {
    if (!selectedObject || viewOnly) return
    setObjects((prev) => prev.filter((obj) => obj !== selectedObject))
    setSelectedObject(null)
  }

  const clearCanvas = () => {
    if (viewOnly) return
    setObjects([])
    setSelectedObject(null)
  }

  const exportCanvas = (format: "png" | "svg" = "png") => {
    if (!canvasRef.current) return

    if (format === "png") {
      const dataURL = canvasRef.current.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = `canvas-${sceneId}.png`
      link.click()
    }

    toast({
      title: "Export successful",
      description: `Canvas exported as ${format.toUpperCase()}`,
    })
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading canvas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Canvas Editor</h1>
          {viewOnly && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">View Only</span>
            </div>
          )}
          <ConnectionStatus />
          {isSaving && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
              <span className="text-xs text-blue-700">Saving...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => exportCanvas("png")}>
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            Clear
          </Button>
          <Button variant="default" size="sm" onClick={() => setIsShareDialogOpen(true)}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Toolbar */}
        {!viewOnly && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <Toolbar
              onAddRectangle={addRectangle}
              onAddCircle={addCircle}
              onAddText={addText}
              onEnableDrawing={enableDrawing}
              onDisableDrawing={disableDrawing}
              onDeleteSelected={deleteSelected}
              currentTool={currentTool}
              hasSelection={!!selectedObject}
            />
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden p-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      <ShareDialog isOpen={isShareDialogOpen} onClose={() => setIsShareDialogOpen(false)} sceneId={sceneId} />
    </div>
  )
}
