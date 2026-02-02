"use client";

import { useState } from "react";
import { Comment, Note } from "../types";
import { mockComments, mockNotes } from "../constants";

export const useInfoDrawer = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [notes, setNotes] = useState<Note[]>(mockNotes);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: "You",
      text,
      timestamp: "Just now",
    };
    setComments([newComment, ...comments]);
  };

  const handleAddNote = (text: string, color: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      color,
      timestamp: ""
    };
    setNotes([newNote, ...notes]);
  };

  return {
    comments,
    notes,
    handleAddComment,
    handleAddNote,
  };
};
