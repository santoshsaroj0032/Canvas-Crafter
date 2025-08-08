"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Eye, Edit } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  sceneId: string
}

export function ShareDialog({ isOpen, onClose, sceneId }: ShareDialogProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const editUrl = `${baseUrl}/canvas/${sceneId}`
  const viewOnlyUrl = `${baseUrl}/canvas/${sceneId}?viewOnly=true`

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Canvas</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-link" className="text-sm font-medium flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Link
            </Label>
            <p className="text-xs text-gray-600 mb-2">Anyone with this link can view and edit the canvas</p>
            <div className="flex gap-2">
              <Input id="edit-link" value={editUrl} readOnly className="flex-1" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(editUrl, "edit")}>
                {copied === "edit" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="view-link" className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View-Only Link
            </Label>
            <p className="text-xs text-gray-600 mb-2">Anyone with this link can only view the canvas</p>
            <div className="flex gap-2">
              <Input id="view-link" value={viewOnlyUrl} readOnly className="flex-1" />
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(viewOnlyUrl, "view")}>
                {copied === "view" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
