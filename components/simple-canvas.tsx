// "use client"

// import type React from "react"
// import { useEffect, useRef, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Share2, Download, Square, Circle, Type, Pen, MousePointer, Trash2 } from 'lucide-react'

// interface SimpleCanvasProps {
//   sceneId: string
// }

// export function SimpleCanvas({ sceneId }: SimpleCanvasProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [currentTool, setCurrentTool] = useState<string>("pen")
//   const [isShareOpen, setIsShareOpen] = useState(false)

//   // Initialize canvas immediately
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     // Set canvas size
//     canvas.width = window.innerWidth - 320
//     canvas.height = window.innerHeight - 80

//     // White background
//     ctx.fillStyle = "#ffffff"
//     ctx.fillRect(0, 0, canvas.width, canvas.height)

//     console.log("Canvas initialized successfully")

//     // Handle resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth - 320
//       canvas.height = window.innerHeight - 80
//       ctx.fillStyle = "#ffffff"
//       ctx.fillRect(0, 0, canvas.width, canvas.height)
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // Drawing functions
//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (currentTool !== "pen") return
//     setIsDrawing(true)
//     draw(e)
//   }

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing || currentTool !== "pen") return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const rect = canvas.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top

//     ctx.lineWidth = 3
//     ctx.lineCap = "round"
//     ctx.strokeStyle = "#1f2937"
//     ctx.lineTo(x, y)
//     ctx.stroke()
//     ctx.beginPath()
//     ctx.moveTo(x, y)
//   }

//   const stopDrawing = () => {
//     if (!canvasRef.current) return
//     const ctx = canvasRef.current.getContext("2d")
//     if (!ctx) return
//     setIsDrawing(false)
//     ctx.beginPath()
//   }

//   const addRectangle = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.fillStyle = "#3b82f6"
//     ctx.strokeStyle = "#1e40af"
//     ctx.lineWidth = 2
//     ctx.fillRect(100, 100, 100, 100)
//     ctx.strokeRect(100, 100, 100, 100)
//   }

//   const addCircle = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.beginPath()
//     ctx.arc(200, 200, 50, 0, 2 * Math.PI)
//     ctx.fillStyle = "#ef4444"
//     ctx.fill()
//     ctx.strokeStyle = "#dc2626"
//     ctx.lineWidth = 2
//     ctx.stroke()
//   }

//   const addText = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.font = "24px Arial"
//     ctx.fillStyle = "#1f2937"
//     ctx.fillText("Sample Text", 250, 250)
//   }

//   const clearCanvas = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.fillStyle = "#ffffff"
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//   }

//   const exportCanvas = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const link = document.createElement("a")
//     link.download = `canvas-${sceneId}.png`
//     link.href = canvas.toDataURL()
//     link.click()
//   }

//   const copyShareLink = () => {
//     const url = window.location.href
//     navigator.clipboard.writeText(url).then(() => {
//       alert("Link copied to clipboard!")
//     })
//   }

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-semibold text-gray-900">Canvas Editor</h1>
          
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" onClick={exportCanvas}>
//             <Download className="w-4 h-4 mr-2" />
//             Export PNG
//           </Button>
//           <Button variant="outline" size="sm" onClick={clearCanvas}>
//             Clear
//           </Button>
//           <Button variant="default" size="sm" onClick={copyShareLink}>
//             <Share2 className="w-4 h-4 mr-2" />
//             Share
//           </Button>
//         </div>
//       </div>

//       <div className="flex-1 flex">
//         {/* Toolbar */}
//         <div className="w-80 bg-white border-r border-gray-200 p-4 space-y-4">
//           <div>
//             <h3 className="text-sm font-medium text-gray-700 mb-3">Tools</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <Button
//                 variant={currentTool === "select" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentTool("select")}
//                 className="flex items-center gap-2"
//               >
//                 <MousePointer className="w-4 h-4" />
//                 Select
//               </Button>
//               <Button
//                 variant={currentTool === "pen" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentTool("pen")}
//                 className="flex items-center gap-2"
//               >
//                 <Pen className="w-4 h-4" />
//                 Draw
//               </Button>
//             </div>
//           </div>

//           <div className="border-t pt-4">
//             <h3 className="text-sm font-medium text-gray-700 mb-3">Shapes</h3>
//             <div className="grid grid-cols-1 gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={addRectangle}
//                 className="flex items-center gap-2 justify-start"
//               >
//                 <Square className="w-4 h-4" />
//                 Rectangle
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={addCircle}
//                 className="flex items-center gap-2 justify-start"
//               >
//                 <Circle className="w-4 h-4" />
//                 Circle
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={addText}
//                 className="flex items-center gap-2 justify-start"
//               >
//                 <Type className="w-4 h-4" />
//                 Text
//               </Button>
//             </div>
//           </div>

//           <div className="border-t pt-4">
//             <h3 className="text-sm font-medium text-gray-700 mb-3">Actions</h3>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={clearCanvas}
//               className="flex items-center gap-2 justify-start w-full text-red-600 hover:text-red-700"
//             >
//               <Trash2 className="w-4 h-4" />
//               Clear Canvas
//             </Button>
//           </div>

//           <div className="border-t pt-4">
//             <h3 className="text-sm font-medium text-gray-700 mb-3">Instructions</h3>
//             <div className="text-xs text-gray-600 space-y-1">
//               <p>• Select "Draw" tool and drag to draw</p>
//               <p>• Click shape buttons to add shapes</p>
//               <p>• Use "Export PNG" to download</p>
//               <p>• Use "Share" to copy link</p>
//             </div>
//           </div>
//         </div>

//         {/* Canvas Area */}
//         <div className="flex-1 overflow-hidden p-4">
//           <canvas
//             ref={canvasRef}
//             className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-crosshair"
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, Download, Square, Circle, Type, Pen, MousePointer, Trash2, RotateCw } from 'lucide-react'

interface SimpleCanvasProps {
  sceneId: string
}

interface CanvasObject {
  id: string
  type: 'rectangle' | 'circle' | 'text' | 'path'
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  text?: string
  fontSize?: number
  fillColor: string
  strokeColor: string
  strokeWidth: number
  rotation: number
  path?: { x: number; y: number }[]
}

interface SelectionHandle {
  x: number
  y: number
  type: 'resize' | 'rotate'
  cursor: string
}

export function SimpleCanvas({ sceneId }: SimpleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [objects, setObjects] = useState<CanvasObject[]>([])
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null)
  const [currentTool, setCurrentTool] = useState<string>("select")
  const [isDrawing, setIsDrawing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])
  const [editingText, setEditingText] = useState<string>("")
  const [showTextInput, setShowTextInput] = useState(false)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth - 320
    canvas.height = window.innerHeight - 80

    redrawCanvas()

    const handleResize = () => {
      canvas.width = window.innerWidth - 320
      canvas.height = window.innerHeight - 80
      redrawCanvas()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Redraw canvas whenever objects change
  useEffect(() => {
    redrawCanvas()
  }, [objects, selectedObject])

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw all objects
    objects.forEach((obj) => {
      drawObject(ctx, obj)
    })

    // Draw selection handles for selected object
    if (selectedObject) {
      drawSelectionHandles(ctx, selectedObject)
    }
  }, [objects, selectedObject])

  const drawObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    ctx.save()
    
    // Apply rotation
    if (obj.rotation !== 0) {
      const centerX = obj.type === 'circle' ? obj.x : obj.x + (obj.width || 0) / 2
      const centerY = obj.type === 'circle' ? obj.y : obj.y + (obj.height || 0) / 2
      ctx.translate(centerX, centerY)
      ctx.rotate((obj.rotation * Math.PI) / 180)
      ctx.translate(-centerX, -centerY)
    }

    ctx.fillStyle = obj.fillColor
    ctx.strokeStyle = obj.strokeColor
    ctx.lineWidth = obj.strokeWidth

    switch (obj.type) {
      case 'rectangle':
        if (obj.width && obj.height) {
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height)
        }
        break
      case 'circle':
        if (obj.radius) {
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI)
          ctx.fill()
          ctx.stroke()
        }
        break
      case 'text':
        if (obj.text) {
          ctx.font = `${obj.fontSize || 24}px Arial`
          ctx.fillText(obj.text, obj.x, obj.y)
        }
        break
      case 'path':
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

    ctx.restore()
  }

  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const handles = getSelectionHandles(obj)
    
    // Draw selection border
    ctx.strokeStyle = "#2563eb"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    
    if (obj.type === 'rectangle' && obj.width && obj.height) {
      ctx.strokeRect(obj.x - 5, obj.y - 5, obj.width + 10, obj.height + 10)
    } else if (obj.type === 'circle' && obj.radius) {
      ctx.beginPath()
      ctx.arc(obj.x, obj.y, obj.radius + 5, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (obj.type === 'text') {
      const textWidth = ctx.measureText(obj.text || "").width
      ctx.strokeRect(obj.x - 5, obj.y - 30, textWidth + 10, 35)
    }
    
    ctx.setLineDash([])

    // Draw handles
    handles.forEach((handle) => {
      ctx.fillStyle = handle.type === 'rotate' ? "#ef4444" : "#2563eb"
      ctx.fillRect(handle.x - 4, handle.y - 4, 8, 8)
    })
  }

  const getSelectionHandles = (obj: CanvasObject): SelectionHandle[] => {
    const handles: SelectionHandle[] = []

    if (obj.type === 'rectangle' && obj.width && obj.height) {
      // Corner resize handles
      handles.push(
        { x: obj.x, y: obj.y, type: 'resize', cursor: 'nw-resize' },
        { x: obj.x + obj.width, y: obj.y, type: 'resize', cursor: 'ne-resize' },
        { x: obj.x, y: obj.y + obj.height, type: 'resize', cursor: 'sw-resize' },
        { x: obj.x + obj.width, y: obj.y + obj.height, type: 'resize', cursor: 'se-resize' }
      )
      // Rotation handle
      handles.push({ x: obj.x + obj.width / 2, y: obj.y - 20, type: 'rotate', cursor: 'grab' })
    } else if (obj.type === 'circle' && obj.radius) {
      // Resize handles for circle
      handles.push(
        { x: obj.x + obj.radius, y: obj.y, type: 'resize', cursor: 'e-resize' },
        { x: obj.x - obj.radius, y: obj.y, type: 'resize', cursor: 'w-resize' },
        { x: obj.x, y: obj.y + obj.radius, type: 'resize', cursor: 's-resize' },
        { x: obj.x, y: obj.y - obj.radius, type: 'resize', cursor: 'n-resize' }
      )
      // Rotation handle
      handles.push({ x: obj.x, y: obj.y - obj.radius - 20, type: 'rotate', cursor: 'grab' })
    }

    return handles
  }

  const getObjectAt = (x: number, y: number): CanvasObject | null => {
    // Check objects in reverse order (top to bottom)
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i]
      if (isPointInObject(x, y, obj)) {
        return obj
      }
    }
    return null
  }

  const isPointInObject = (x: number, y: number, obj: CanvasObject): boolean => {
    switch (obj.type) {
      case 'rectangle':
        return typeof obj.width === "number" && typeof obj.height === "number" &&
               x >= obj.x && x <= obj.x + obj.width &&
               y >= obj.y && y <= obj.y + obj.height
      case 'circle':
        if (!obj.radius) return false
        const dx = x - obj.x
        const dy = y - obj.y
        return dx * dx + dy * dy <= obj.radius * obj.radius
      case 'text':
        const canvas = canvasRef.current
        if (!canvas) return false
        const ctx = canvas.getContext("2d")
        if (!ctx) return false
        ctx.font = `${obj.fontSize || 24}px Arial`
        const textWidth = ctx.measureText(obj.text || "").width
        return x >= obj.x && x <= obj.x + textWidth && y >= obj.y - 24 && y <= obj.y
      case 'path':
        // Simple path hit detection (could be improved)
        return obj.path?.some(point => 
          Math.abs(point.x - x) < 10 && Math.abs(point.y - y) < 10
        ) || false
      default:
        return false
    }
  }

  const getHandleAt = (x: number, y: number): SelectionHandle | null => {
    if (!selectedObject) return null
    
    const handles = getSelectionHandles(selectedObject)
    return handles.find(handle => 
      Math.abs(handle.x - x) < 8 && Math.abs(handle.y - y) < 8
    ) || null
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentTool === "pen") {
      setIsDrawing(true)
      setCurrentPath([{ x, y }])
      return
    }

    if (currentTool === "select") {
      // Check if clicking on a handle
      const handle = getHandleAt(x, y)
      if (handle) {
        if (handle.type === 'resize') {
          setIsResizing(true)
        } else if (handle.type === 'rotate') {
          // Start rotation (simplified - just increment rotation)
          if (selectedObject) {
            updateObject(selectedObject.id, { rotation: selectedObject.rotation + 15 })
          }
        }
        setDragStart({ x, y })
        return
      }

      // Check if clicking on an object
      const clickedObject = getObjectAt(x, y)
      if (clickedObject) {
        setSelectedObject(clickedObject)
        setIsDragging(true)
        setDragStart({ x: x - clickedObject.x, y: y - clickedObject.y })
      } else {
        setSelectedObject(null)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isDrawing && currentTool === "pen") {
      setCurrentPath(prev => [...prev, { x, y }])
      
      // Draw current stroke in real-time
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
      return
    }

    if (isDragging && selectedObject && currentTool === "select") {
      const newX = x - dragStart.x
      const newY = y - dragStart.y
      updateObject(selectedObject.id, { x: newX, y: newY })
    }

    if (isResizing && selectedObject) {
      const deltaX = x - dragStart.x
      const deltaY = y - dragStart.y
      
      if (selectedObject.type === 'rectangle') {
        const newWidth = Math.max(10, (selectedObject.width || 0) + deltaX)
        const newHeight = Math.max(10, (selectedObject.height || 0) + deltaY)
        updateObject(selectedObject.id, { width: newWidth, height: newHeight })
      } else if (selectedObject.type === 'circle') {
        const newRadius = Math.max(5, (selectedObject.radius || 0) + deltaX / 2)
        updateObject(selectedObject.id, { radius: newRadius })
      }
      setDragStart({ x, y })
    }
  }

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      const newPath: CanvasObject = {
        id: Date.now().toString(),
        type: 'path',
        x: currentPath[0].x,
        y: currentPath[0].y,
        fillColor: "#1f2937",
        strokeColor: "#1f2937",
        strokeWidth: 3,
        rotation: 0,
        path: currentPath
      }
      setObjects(prev => [...prev, newPath])
    }
    
    setIsDrawing(false)
    setIsDragging(false)
    setIsResizing(false)
    setCurrentPath([])
  }

  const updateObject = (id: string, updates: Partial<CanvasObject>) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ))
    if (selectedObject && selectedObject.id === id) {
      setSelectedObject(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const addRectangle = () => {
    const newRect: CanvasObject = {
      id: Date.now().toString(),
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fillColor: "#3b82f6",
      strokeColor: "#1e40af",
      strokeWidth: 2,
      rotation: 0
    }
    setObjects(prev => [...prev, newRect])
    setSelectedObject(newRect)
  }

  const addCircle = () => {
    const newCircle: CanvasObject = {
      id: Date.now().toString(),
      type: 'circle',
      x: 200,
      y: 200,
      radius: 50,
      fillColor: "#ef4444",
      strokeColor: "#dc2626",
      strokeWidth: 2,
      rotation: 0
    }
    setObjects(prev => [...prev, newCircle])
    setSelectedObject(newCircle)
  }

  const addText = () => {
    const newText: CanvasObject = {
      id: Date.now().toString(),
      type: 'text',
      x: 250,
      y: 250,
      text: "Double click to edit",
      fontSize: 24,
      fillColor: "#1f2937",
      strokeColor: "#1f2937",
      strokeWidth: 1,
      rotation: 0
    }
    setObjects(prev => [...prev, newText])
    setSelectedObject(newText)
  }

  const deleteSelected = () => {
    if (!selectedObject) return
    setObjects(prev => prev.filter(obj => obj.id !== selectedObject.id))
    setSelectedObject(null)
  }

  const clearCanvas = () => {
    setObjects([])
    setSelectedObject(null)
  }

  const exportCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `canvas-${sceneId}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const copyShareLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!")
    })
  }

  const handleTextEdit = () => {
    if (selectedObject && selectedObject.type === 'text') {
      setEditingText(selectedObject.text || "")
      setShowTextInput(true)
    }
  }

  const saveTextEdit = () => {
    if (selectedObject && selectedObject.type === 'text') {
      updateObject(selectedObject.id, { text: editingText })
    }
    setShowTextInput(false)
    setEditingText("")
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Canvas Editor</h1>
           
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCanvas}>
            <Download className="w-4 h-4 mr-2" />
            Export PNG
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            Clear
          </Button>
          <Button variant="default" size="sm" onClick={copyShareLink}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Toolbar */}
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
                className="flex items-center gap-2 justify-start"
              >
                <Square className="w-4 h-4" />
                Rectangle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addCircle}
                className="flex items-center gap-2 justify-start"
              >
                <Circle className="w-4 h-4" />
                Circle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addText}
                className="flex items-center gap-2 justify-start"
              >
                <Type className="w-4 h-4" />
                Text
              </Button>
            </div>
          </div>

          {selectedObject && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Properties</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-600">Fill Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedObject.fillColor}
                      onChange={(e) => updateObject(selectedObject.id, { fillColor: e.target.value })}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      type="text"
                      value={selectedObject.fillColor}
                      onChange={(e) => updateObject(selectedObject.id, { fillColor: e.target.value })}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-600">Stroke Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={selectedObject.strokeColor}
                      onChange={(e) => updateObject(selectedObject.id, { strokeColor: e.target.value })}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      type="text"
                      value={selectedObject.strokeColor}
                      onChange={(e) => updateObject(selectedObject.id, { strokeColor: e.target.value })}
                      className="flex-1 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-600">Stroke Width</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={selectedObject.strokeWidth}
                    onChange={(e) => updateObject(selectedObject.id, { strokeWidth: parseInt(e.target.value) || 1 })}
                    className="mt-1"
                  />
                </div>

                {selectedObject.type === 'text' && (
                  <>
                    <div>
                      <Label className="text-xs text-gray-600">Font Size</Label>
                      <Input
                        type="number"
                        min="8"
                        max="72"
                        value={selectedObject.fontSize || 24}
                        onChange={(e) => updateObject(selectedObject.id, { fontSize: parseInt(e.target.value) || 24 })}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTextEdit}
                      className="w-full"
                    >
                      Edit Text
                    </Button>
                  </>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateObject(selectedObject.id, { rotation: selectedObject.rotation + 15 })}
                    className="flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    Rotate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteSelected}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Instructions</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• <strong>Select tool:</strong> Click objects to select</p>
              <p>• <strong>Draw tool:</strong> Drag to draw freehand</p>
              <p>• <strong>Move:</strong> Drag selected objects</p>
              <p>• <strong>Resize:</strong> Drag corner handles</p>
              <p>• <strong>Rotate:</strong> Use rotate button or handle</p>
              <p>• <strong>Edit:</strong> Use properties panel</p>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden p-4">
          <canvas
            ref={canvasRef}
            className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={selectedObject?.type === 'text' ? handleTextEdit : undefined}
          />
        </div>
      </div>

      {/* Text Edit Modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Edit Text</h3>
            <Input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="mb-4"
              placeholder="Enter text..."
              autoFocus
            />
            <div className="flex gap-2">
              <Button onClick={saveTextEdit}>Save</Button>
              <Button variant="outline" onClick={() => setShowTextInput(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

