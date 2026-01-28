import { useState } from "react";
import { Comment } from "../types";
import Text from "../../../ui/Text";
import Textarea from "../../../ui/Textarea";

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
}

export default function CommentsSection({
  comments,
  onAddComment,
}: CommentsSectionProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText);
      setCommentText("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Type in comment here"
        className="w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-input-filled border border-input-stroke rounded-[0.8rem] px-2 py-1  hover:bg-black-5 transition-colors"
          >
            <div className="flex items-center gap-1 mb-1">
              <Text className="text-base font-medium text-dark-base-100">
                {comment.author}
              </Text>
            </div>
            <Text className="text-md text-dark-base-70 mb-1">
              {comment.text}
            </Text>
            <Text className="text-[1rem] text-dark-base-40">
              {comment.timestamp}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
