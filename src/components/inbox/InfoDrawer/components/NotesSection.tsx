import { useState } from "react"
import { Note } from "../types"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import Text from "../../../ui/Text"
import { cn } from "../../../../lib/utils"

interface NotesSectionProps {
  notes: Note[]
  onAddNote?: (text: string, color: string) => void
}

const noteColors = [
  { value: "purple", bg: "bg-purple-100", border: "border-purple-500" },
  { value: "yellow", bg: "bg-yellow-100", border: "border-yellow-500" },
  { value: "blue", bg: "bg-blue-100", border: "border-blue-500" },
  { value: "green", bg: "bg-green-100", border: "border-green-500" },
]

export default function NotesSection({
  notes,
  onAddNote,
}: NotesSectionProps) {
  const [noteText, setNoteText] = useState("")
  const [selectedColor, setSelectedColor] = useState("blue")

  const handleSubmit = () => {
    if (noteText.trim() && onAddNote) {
      onAddNote(noteText, selectedColor)
      setNoteText("")
    }
  }

  const selectedColorConfig = noteColors.find((c) => c.value === selectedColor)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type in note here"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit()
            }
          }}
        />
        <div className="flex items-center gap-1">
          {noteColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                color.bg,
                selectedColor === color.value
                  ? color.border
                  : "border-transparent"
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {notes.map((note) => {
          const colorConfig = noteColors.find((c) => c.value === note.color)
          return (
            <div
              key={note.id}
              className={cn(
                "rounded-[0.8rem] p-3 border-l-4",
                colorConfig?.bg,
                colorConfig?.border
              )}
            >
              <Text className="text-[1.4rem] text-text-primary">
                {note.text}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
