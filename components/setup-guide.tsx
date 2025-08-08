"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Copy, Check, Info } from "lucide-react"

export function SetupGuide() {
  const [copied, setCopied] = useState(false)

  const envTemplate = `NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`

  const copyEnvTemplate = async () => {
    try {
      await navigator.clipboard.writeText(envTemplate)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Firebase Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertDescription>
              The canvas editor is currently running in local storage mode. To enable cloud sync and sharing, please set
              up Firebase.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Setup Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>
                Create a new Firebase project at{" "}
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Firebase Console <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Enable Firestore Database in your project</li>
              <li>Go to Project Settings → General → Your apps</li>
              <li>Create a web app and copy the configuration</li>
              <li>Add the environment variables to your project</li>
            </ol>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Environment Variables Template:</h4>
              <Button variant="outline" size="sm" onClick={copyEnvTemplate}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto">{envTemplate}</pre>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Note:</strong> The app will continue to work with local storage, but sharing and cloud sync
              features will be limited to the current browser session.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
