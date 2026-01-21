import { Thread, Comment, Note, File } from "./types"

export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    title: "Design review",
    replyCount: 5,
    lastActivity: "2h ago",
  },
  {
    id: "thread-2",
    title: "Color Pallet Discussion",
    replyCount: 12,
    lastActivity: "4h ago",
  },
]

export const mockComments: Comment[] = [
  {
    id: "comment-1",
    author: "Sarah Miller",
    text: "Love the new navigation design",
    timestamp: "1h ago",
  },
  {
    id: "comment-2",
    author: "Mike Johnson",
    text: "Should we consider a mobile layout",
    timestamp: "3h ago",
  },
]

export const mockNotes: Note[] = [
  {
    id: "note-1",
    text: "Remember to update brand guidelines document.",
    color: "purple",
    timestamp: "2h ago",
  },
  {
    id: "note-2",
    text: "Remember to update brand guidelines document.",
    color: "yellow",
    timestamp: "1d ago",
  },
]

export const mockFiles: File[] = [
  {
    id: "file-1",
    name: "site screens.png",
    size: "10 MB",
    type: "PNG",
    thumbnail: "https://via.placeholder.com/40",
  },
  {
    id: "file-2",
    name: "site screens.png",
    size: "10 MB",
    type: "PNG",
    thumbnail: "https://via.placeholder.com/40",
  },
]
