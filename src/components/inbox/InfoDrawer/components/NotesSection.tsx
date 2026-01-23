import { useState } from "react";
import { Note } from "../types";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Text from "../../../ui/Text";
import { cn } from "../../../../lib/utils";

interface NotesSectionProps {
  notes: Note[];
  onAddNote?: (text: string, color: string) => void;
}

const noteColors = [
  { value: "purple", bg: "bg-purple-100", border: "border-purple-110" },
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

  const selectedColorConfig = noteColors.find((c) => c.value === selectedColor);

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
              handleSubmit();
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
                  : "border-transparent",
              )}
            />
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
                "rounded-[0.8rem] p-3 border-l-4",
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
