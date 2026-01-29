import { useState } from "react";
import { Note } from "../types";
import Text from "../../../ui/Text";
import { cn } from "../../../../lib/utils";
import Textarea from "../../../ui/Textarea";

interface NotesSectionProps {
  notes: Note[];
  onAddNote?: (text: string, color: string) => void;
}

const noteColors = [
  { value: "purple", bg: "bg-purple-100/5", border: "border-purple-100" },
  { value: "yellow", bg: "bg-secondary-5", border: "border-secondary-100" },
  { value: "blue", bg: "bg-primary-blue-50/10", border: "border-primary-blue" },
  {
    value: "green",
    bg: "bg-secondary-green-5",
    border: "border-secondary-green-110",
  },
];

export default function NotesSection({ notes, onAddNote }: NotesSectionProps) {
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const handleSubmit = () => {
    if (noteText.trim() && onAddNote) {
      onAddNote(noteText, selectedColor);
      setNoteText("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center gap-2">
        <Textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type in note here"
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <div className="flex items-center gap-1 absolute top-4 right-4">
          {noteColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                "w-[1.4rem] h-[1.4rem] rounded-full border transition-all bg-transparent flex justify-center items-center",
                selectedColor === color.value
                  ? color.border
                  : "border-input-stroke",
              )}
            ><span className={cn("block w-[1rem] h-[1rem] rounded-full", color.bg)} /></button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {notes.map((note) => {
          const colorConfig = noteColors.find((c) => c.value === note.color);
          return (
            <div
              key={note.id}
              className={cn(
                "py-1 px-2 border-l",
                colorConfig?.bg,
                colorConfig?.border,
              )}
            >
              <Text className="text-[1.4rem] text-dark-base-70">
                {note.text}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}
