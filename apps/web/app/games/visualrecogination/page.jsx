"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function VisualRecognitionGame() {
  const images = [
    { src: "/images/animal1.jpg", category: "Animal" },
    { src: "/images/object1.jpg", category: "Object" },
    { src: "/images/animal2.jpg", category: "Animal" },
    { src: "/images/object2.jpg", category: "Object" },
  ]

  const [currentImage, setCurrentImage] = useState(null)
  const [userCategory, setUserCategory] = useState("")
  const [moves, setMoves] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    // Pick a random image from the array
    nextImage()
  }, [])

  const nextImage = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)]
    setCurrentImage(randomImage)
    setUserCategory("")
  }

  const handleCategoryChange = (e) => {
    setUserCategory(e.target.value)
  }

  const checkAnswer = () => {
    setMoves((prev) => prev + 1)
    if (userCategory === currentImage.category) {
      setCorrectCount((prev) => prev + 1)
    }

    // If 5 moves are completed, end the game
    if (moves + 1 === 5) {
      setGameOver(true)
    } else {
      nextImage()
    }
  }

  const restartGame = () => {
    setMoves(0)
    setCorrectCount(0)
    setUserCategory("")
    setGameOver(false)
    nextImage()
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header with Category Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Visual Recognition</h3>
        <Badge variant="outline">Visual</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Identify and categorize images to strengthen visual processing.
      </p>

      {/* Image Display */}
      <div className="text-center mb-4">
        {currentImage && (
          <img
            src={currentImage.src}
            alt="Visual Item"
            className="max-w-full max-h-64 mx-auto mb-4 rounded-md shadow-md"
          />
        )}
      </div>

      {/* Category Options */}
      <div className="mb-4">
        <label className="block text-sm text-muted-foreground mb-2">Choose Category</label>
        <select
          value={userCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select Category</option>
          <option value="Animal">Animal</option>
          <option value="Object">Object</option>
        </select>
      </div>

      {/* Submit Answer Button */}
      <Button onClick={checkAnswer} className="mt-2" disabled={gameOver}>
        Submit Answer
      </Button>

      {/* Progress & Move Counter */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {`${moves} Moves`}
        </div>
        <Progress value={(moves / 5) * 100} className="h-2 w-40" />
      </div>

      {/* Correct Answers */}
      <div className="flex items-center mb-4">
        <span className="text-sm text-muted-foreground">Correct: {correctCount}</span>
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-primary">Game Over!</h2>
          <p className="text-sm text-muted-foreground">You identified {correctCount} out of 5 images correctly.</p>
          <Button variant="outline" onClick={restartGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
