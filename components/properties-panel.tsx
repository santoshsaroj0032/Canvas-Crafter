"use client"

import { useState, useEffect } from "react"
import type { fabric } from "fabric"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

interface PropertiesPanelProps {
  selectedObject: fabric.Object
  canvas: fabric.Canvas | null
  onUpdate: () => void
}

export function PropertiesPanel({ selectedObject, canvas, onUpdate }: PropertiesPanelProps) {
  const [fill, setFill] = useState("#3b82f6")
  const [stroke, setStroke] = useState("#1e40af")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [opacity, setOpacity] = useState(100)

  useEffect(() => {
    if (selectedObject) {
      setFill((selectedObject.fill as string) || "#3b82f6")
      setStroke((selectedObject.stroke as string) || "#1e40af")
      setStrokeWidth(selectedObject.strokeWidth || 2)
      setOpacity(Math.round((selectedObject.opacity || 1) * 100))
    }
  }, [selectedObject])

  const updateProperty = (property: string, value: any) => {
    if (!selectedObject || !canvas) return

    selectedObject.set(property as keyof fabric.Object, value)
    canvas.renderAll()
    onUpdate()
  }

  const handleFillChange = (color: string) => {
    setFill(color)
    updateProperty("fill", color)
  }

  const handleStrokeChange = (color: string) => {
    setStroke(color)
    updateProperty("stroke", color)
  }

  const handleStrokeWidthChange = (width: number[]) => {
    const newWidth = width[0]
    setStrokeWidth(newWidth)
    updateProperty("strokeWidth", newWidth)
  }

  const handleOpacityChange = (opacity: number[]) => {
    const newOpacity = opacity[0]
    setOpacity(newOpacity)
    updateProperty("opacity", newOpacity / 100)
  }

  if (!selectedObject) return null

  const isText = selectedObject.type === "i-text" || selectedObject.type === "text"

  return (
    <div className="p-4 border-t border-gray-200 space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Properties</h3>

      <div className="space-y-3">
        <div>
          <Label htmlFor="fill-color" className="text-xs text-gray-600">
            {isText ? "Text Color" : "Fill Color"}
          </Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="fill-color"
              type="color"
              value={fill}
              onChange={(e) => handleFillChange(e.target.value)}
              className="w-12 h-8 p-1 border rounded"
            />
            <Input
              type="text"
              value={fill}
              onChange={(e) => handleFillChange(e.target.value)}
              className="flex-1 text-xs"
            />
          </div>
        </div>

        {!isText && (
          <div>
            <Label htmlFor="stroke-color" className="text-xs text-gray-600">
              Stroke Color
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="stroke-color"
                type="color"
                value={stroke}
                onChange={(e) => handleStrokeChange(e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                type="text"
                value={stroke}
                onChange={(e) => handleStrokeChange(e.target.value)}
                className="flex-1 text-xs"
              />
            </div>
          </div>
        )}

        {!isText && (
          <div>
            <Label className="text-xs text-gray-600">Stroke Width: {strokeWidth}px</Label>
            <Slider
              value={[strokeWidth]}
              onValueChange={handleStrokeWidthChange}
              max={20}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
        )}

        <div>
          <Label className="text-xs text-gray-600">Opacity: {opacity}%</Label>
          <Slider value={[opacity]} onValueChange={handleOpacityChange} max={100} min={0} step={5} className="mt-2" />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            selectedObject.bringToFront()
            canvas?.renderAll()
            onUpdate()
          }}
          className="w-full text-xs"
        >
          Bring to Front
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            selectedObject.sendToBack()
            canvas?.renderAll()
            onUpdate()
          }}
          className="w-full text-xs"
        >
          Send to Back
        </Button>
      </div>
    </div>
  )
}
