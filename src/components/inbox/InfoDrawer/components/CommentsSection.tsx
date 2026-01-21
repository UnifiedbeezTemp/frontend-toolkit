import { useState } from "react"
import { Comment } from "../types"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import Text from "../../../ui/Text"
import Avatar from "../../../ui/Avatar"

interface CommentsSectionProps {
  comments: Comment[]
  onAddComment?: (text: string) => void
}

export default function CommentsSection({
  comments,
  onAddComment,
}: CommentsSectionProps) {
  const [commentText, setCommentText] = useState("")

  const handleSubmit = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText)
      setCommentText("")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Type in comment here"
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit()
          }
        }}
      />
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 rounded-[0.8rem] p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Avatar
                name={comment.author}
                alt={comment.author}
                size="sm"
              />
              <Text className="text-[1.4rem] font-medium text-text-primary">
                {comment.author}
              </Text>
            </div>
            <Text className="text-[1.4rem] text-text-primary mb-1">
              {comment.text}
            </Text>
            <Text className="text-[1.2rem] text-text-secondary">
              {comment.timestamp}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
