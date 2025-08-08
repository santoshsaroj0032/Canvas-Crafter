"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Download, Square, Circle, Type, Pen, MousePointer, Trash2 } from "lucide-react"

interface SimpleCanvasFallbackProps {
  sceneId: string
  viewOnly?: boolean
}

export function SimpleCanvasFallback({ sceneId, viewOnly = false }: SimpleCanvasFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState<string>("pen")

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

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth - (viewOnly ? 0 : 320)
      canvas.height = window.innerHeight - 60
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [viewOnly])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (viewOnly || currentTool !== "pen") return
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || currentTool !== "pen") return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = "#1f2937"

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    setIsDrawing(false)
    ctx.beginPath()
  }

  const addRectangle = () => {
    if (!canvasRef.current || viewOnly) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#3b82f6"
    ctx.strokeStyle = "#1e40af"
    ctx.lineWidth = 2
    ctx.fillRect(100, 100, 100, 100)
    ctx.strokeRect(100, 100, 100, 100)
  }

  const addCircle = () => {
    if (!canvasRef.current || viewOnly) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.arc(200, 200, 50, 0, 2 * Math.PI)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
    ctx.strokeStyle = "#dc2626"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const addText = () => {
    if (!canvasRef.current || viewOnly) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.font = "24px Arial"
    ctx.fillStyle = "#1f2937"
    ctx.fillText("Sample Text", 250, 250)
  }

  const clearCanvas = () => {
    if (!canvasRef.current || viewOnly) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const exportCanvas = () => {
    if (!canvasRef.current) return
    const link = document.createElement("a")
    link.download = `canvas-${sceneId}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Canvas Editor (Simple Mode)</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full">
            <span className="text-xs text-yellow-700">Fallback mode - limited features</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCanvas}>
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
          <Button variant="default" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Simple Toolbar */}
        {!viewOnly && (
          <div className="w-80 bg-white border-r border-gray-200 p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={currentTool === "select" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTool("select")}
                  className="flex items-center gap-2"
                >
                  <MousePointer className="w-4 h-4" />
                  Select
                </Button>
                <Button
                  variant={currentTool === "pen" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTool("pen")}
                  className="flex items-center gap-2"
                >
                  <Pen className="w-4 h-4" />
                  Draw
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Shapes</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRectangle}
                  className="flex items-center gap-2 justify-start bg-transparent"
                >
                  <Square className="w-4 h-4" />
                  Rectangle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCircle}
                  className="flex items-center gap-2 justify-start bg-transparent"
                >
                  <Circle className="w-4 h-4" />
                  Circle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addText}
                  className="flex items-center gap-2 justify-start bg-transparent"
                >
                  <Type className="w-4 h-4" />
                  Text
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Actions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="flex items-center gap-2 justify-start w-full text-red-600 hover:text-red-700 bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
                Clear Canvas
              </Button>
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden p-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  )
}
