"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function WordPuzzleGame() {
  const words = ["ALZHEIMERS", "DEMENTIA", "MEMORY", "COGNITION", "THERAPY"]
  const [currentWord, setCurrentWord] = useState("")
  const [shuffledWord, setShuffledWord] = useState("")
  const [userInput, setUserInput] = useState("")
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    // Pick a random word and shuffle it
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setShuffledWord(shuffleWord(word))
  }, [])

  const shuffleWord = (word) => {
    return word.split("").sort(() => Math.random() - 0.5).join("")
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const checkGuess = () => {
    setMoves((prev) => prev + 1)

    if (userInput.toUpperCase() === currentWord) {
      setGameOver(true)
    }
  }

  const restartGame = () => {
    setMoves(0)
    setUserInput("")
    setGameOver(false)
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setShuffledWord(shuffleWord(word))
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header with Category Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Word Puzzle</h3>
        <Badge variant="outline">Language</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Complete word puzzles to enhance language skills.
      </p>

      {/* Shuffled Word & Input */}
      <div className="text-center mb-4">
        <div className="text-xl font-bold mb-2">
          <span className="text-primary">Shuffled Word:</span> {shuffledWord}
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="border p-2 rounded-md"
          placeholder="Enter your guess"
        />
        <Button onClick={checkGuess} className="mt-2" disabled={gameOver}>
          Submit Guess
        </Button>
      </div>

      {/* Progress & Move Counter */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {`${moves} Moves`}
        </div>
        <Progress value={(moves / 10) * 100} className="h-2 w-40" />
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-primary">You Win!</h2>
          <Button variant="outline" onClick={restartGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
