import InboxSearchBar from "../components/SearchBar"
import ChannelHeaderRow from "./ChannelHeaderRow"

export default function ChannelsList() {
  return (
    <div>
      <div className="my-4">
        <InboxSearchBar
          value={""}
          onChange={() => {}}
        />
      </div>
      <ChannelHeaderRow
        channel={{
          label: "Whatsapp",
        }}
      />
    </div>
  )
}
