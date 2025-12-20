import Heading from "../ui/Heading"
import Text from "../ui/Text"
import { ErrorContentProps } from "./types"

export default function ErrorContent({ title, message }: ErrorContentProps) {
  return (
    <div className="mb-6 max-w-96">
      <Heading
        size="lg"
        className="text-gray-900 font-bold text-xl mb-2 text-center"
      >
        {title}
      </Heading>
      <Text className="text-gray-600 text-center text-md">{message}</Text>
    </div>
  )
}
