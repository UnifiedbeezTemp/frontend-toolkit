import { useState, useMemo } from "react"
import { Channel, ChannelAccount } from "../types"
import ImageComponent from "../../../ui/ImageComponent"
import Input from "../../../ui/Input"
import Button from "../../../ui/Button"
import Checkbox from "../../../ui/CheckBox"
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase"
import SearchIcon from "../../../../assets/icons/SearchIcon"

interface AccountListPanelProps {
  channel: Channel | null
  accounts: ChannelAccount[]
}

export default function AccountListPanel({
  channel,
  accounts,
}: AccountListPanelProps) {
  const icons = useSupabaseIcons()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const filteredAccounts = useMemo(() => {
    if (!searchQuery.trim()) return accounts

    const query = searchQuery.toLowerCase()
    return accounts.filter(
      (account) =>
        account.name.toLowerCase().includes(query) ||
        account.phoneNumber?.toLowerCase().includes(query) ||
        account.email?.toLowerCase().includes(query)
    )
  }, [accounts, searchQuery])

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedAccountIds(filteredAccounts.map((acc) => acc.id))
    } else {
      setSelectedAccountIds([])
    }
  }

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccountIds((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    )
  }

  if (!channel) {
    return (
      <div className="flex items-center justify-center h-full text-text-secondary">
        Select a channel to view accounts
      </div>
    )
  }

  const iconKey = channel.icon as keyof typeof icons
  const channelIcon = icons[iconKey]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-3">
          <ImageComponent
            src={channelIcon}
            alt={channel.name}
            width={25}
            height={25}
          />
          <div>
            <div className="text-[1.8rem] font-bold text-text-primary">
              {channel.name}
            </div>
            <div className="text-[1.4rem] text-text-secondary">
              Select a {channel.name} account to connect
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          leftIcon={<SearchIcon />}
          className="w-full"
        />
      </div>

      <div className="px-4 mb-4 flex items-center gap-2">
        <Checkbox
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <span className="text-[1.4rem] text-text-primary">Channels</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            No accounts found
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredAccounts.map((account) => {
              const isSelected = selectedAccountIds.includes(account.id)
              const isConnected = account.isConnected

              return (
                <div
                  key={account.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleAccountToggle(account.id)}
                    />
                    <ImageComponent
                      src={channelIcon}
                      alt={channel.name}
                      width={25}
                      height={25}
                    />
                    <div>
                      <div className="text-[1.4rem] text-text-primary">
                        {account.phoneNumber || account.email || account.name}
                      </div>
                      {account.phoneNumber && (
                        <div className="text-[1.2rem] text-text-secondary">
                          {account.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[1.2rem]"
                  >
                    Start chat
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
