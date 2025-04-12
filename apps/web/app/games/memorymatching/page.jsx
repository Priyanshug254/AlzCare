"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

export default function MemoryMatchingGame() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const cardIcons = ["🧠", "🎵", "🖼️", "🧩", "💡", "🌟"]

  useEffect(() => {
    // Shuffle and initialize cards
    const initializeCards = () => {
      const shuffled = [...cardIcons, ...cardIcons]
        .map((icon) => ({ id: Math.random(), icon }))
        .sort(() => Math.random() - 0.5)
      setCards(shuffled)
    }

    initializeCards()
  }, [])

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true)
    }
  }, [matchedCards, cards.length])

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || matchedCards.includes(card)) return

    setFlippedCards((prev) => [...prev, card])
    setMoves((prev) => prev + 1)

    if (flippedCards.length === 1) {
      if (flippedCards[0].icon === card.icon) {
        setMatchedCards((prev) => [...prev, flippedCards[0], card])
      }
      setTimeout(() => setFlippedCards([]), 1000)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Memory Matching Game</h1>
      <p className="text-muted-foreground mb-6">
        Flip and match pairs to stimulate short-term memory.
      </p>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`cursor-pointer h-24 flex items-center justify-center text-2xl rounded-xl shadow transition-all ${
              flippedCards.includes(card) || matchedCards.includes(card)
                ? "bg-primary/10"
                : "bg-muted/50"
            }`}
          >
            {(flippedCards.includes(card) || matchedCards.includes(card)) && card.icon}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          {`${moves} Moves`}
        </div>
        <Progress value={(matchedCards.length / cards.length) * 100} className="h-2 w-40" />
      </div>
      {gameOver && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-primary">You Win!</h2>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}
