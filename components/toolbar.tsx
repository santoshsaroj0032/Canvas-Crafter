"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Square, Circle, Type, Pen, MousePointer, Trash2 } from "lucide-react"

interface ToolbarProps {
  onAddRectangle: () => void
  onAddCircle: () => void
  onAddText: () => void
  onEnableDrawing: () => void
  onDisableDrawing: () => void
  onDeleteSelected: () => void
  currentTool: string
  hasSelection: boolean
}

export function Toolbar({
  onAddRectangle,
  onAddCircle,
  onAddText,
  onEnableDrawing,
  onDisableDrawing,
  onDeleteSelected,
  currentTool,
  hasSelection,
}: ToolbarProps) {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={currentTool === "select" ? "default" : "outline"}
            size="sm"
            onClick={onDisableDrawing}
            className="flex items-center gap-2"
          >
            <MousePointer className="w-4 h-4" />
            Select
          </Button>
          <Button
            variant={currentTool === "pen" ? "default" : "outline"}
            size="sm"
            onClick={onEnableDrawing}
            className="flex items-center gap-2"
          >
            <Pen className="w-4 h-4" />
            Draw
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Shapes</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddRectangle}
            className="flex items-center gap-2 justify-start bg-transparent"
          >
            <Square className="w-4 h-4" />
            Rectangle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddCircle}
            className="flex items-center gap-2 justify-start bg-transparent"
          >
            <Circle className="w-4 h-4" />
            Circle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddText}
            className="flex items-center gap-2 justify-start bg-transparent"
          >
            <Type className="w-4 h-4" />
            Text
          </Button>
        </div>
      </div>

      {hasSelection && (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Actions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onDeleteSelected}
              className="flex items-center gap-2 justify-start w-full text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
