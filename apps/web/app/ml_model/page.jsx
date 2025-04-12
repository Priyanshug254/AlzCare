"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function MLModelPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const handlePredict = async () => {
    if (!selectedImage) return

    const formData = new FormData()
    formData.append("image", selectedImage)

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setResult(data?.prediction || "No result found.")
    } catch (err) {
      setResult("Error occurred while predicting.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image for Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <div className="rounded border p-2">
              <Image
                src={previewUrl}
                alt="Preview"
                width={300}
                height={300}
                className="rounded object-contain max-h-60"
              />
            </div>
          )}
          <Button onClick={handlePredict} disabled={loading || !selectedImage}>
            {loading ? "Analyzing..." : "Analyze Image"}
          </Button>
          {result && (
            <div className="mt-4 p-3 border rounded text-sm font-medium bg-muted">
              Prediction Result: <span className="text-primary">{result}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
