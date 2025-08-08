"use client"

import { useState, useEffect } from "react"
import { getStorageStatus, isFirebaseConfigured } from "@/lib/firebase"
import { Wifi, HardDrive, AlertTriangle } from "lucide-react"

export function ConnectionStatus() {
  const [status, setStatus] = useState<"firebase" | "local" | "error" | "checking">("checking")

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const storageStatus = await getStorageStatus()
        setStatus(storageStatus)
      } catch (error) {
        console.error("Failed to check storage status:", error)
        setStatus("local")
      }
    }

    checkConnection()
  }, [])

  if (status === "checking") {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-gray-100">
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
        <span className="text-gray-600">Checking...</span>
      </div>
    )
  }

  const statusConfig = {
    firebase: {
      icon: <Wifi className="w-3 h-3 text-green-600" />,
      text: "Cloud sync active",
      className: "bg-green-100 text-green-700",
    },
    local: {
      icon: <HardDrive className="w-3 h-3 text-blue-600" />,
      text: isFirebaseConfigured ? "Local storage (no config)" : "Local storage only",
      className: "bg-blue-100 text-blue-700",
    },
    error: {
      icon: <AlertTriangle className="w-3 h-3 text-orange-600" />,
      text: "Cloud error - using local",
      className: "bg-orange-100 text-orange-700",
    },
  }

  const config = statusConfig[status]

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${config.className}`}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  )
}
