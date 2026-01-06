import { ReactNode } from "react"

export default function ConversationContainer({
  header,
  body,
  composer,
}: {
  header: ReactNode
  body: ReactNode
  composer: ReactNode
}) {
  return (
    <>
      <div className="absolute h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto w-full inset-0 bg-white">
        <div className="sticky top-0 bg-primary border-b border-b-gray-60">
          {header}
        </div>
        <div className="min-h-full px-4">{body}</div>
        <div className="sticky bottom-0 py-6 px-4 bg-primary">{composer}</div>
      </div>
    </>
  )
}
