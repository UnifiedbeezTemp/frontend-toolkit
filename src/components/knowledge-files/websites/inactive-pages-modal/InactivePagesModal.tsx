import InactivePagesModalHeader from "./InactivePagesModalHeader";
import InactivePagesSearch from "./InactivePagesSearch";
import InactivePagesList from "./InactivePagesList";
import InactivePagesModalActions from "./InactivePagesModalActions";
import { WebsitePage } from "../utils/types";
import Modal from "../../../modal/Modal";
import { useInactivePagesModal } from "./hooks/useInactivePagesModal";

interface InactivePagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedUrls: string[]) => void;
  pages: WebsitePage[];
  isLoading?: boolean;
  bottomSheet?: boolean;
}

export default function InactivePagesModal({
  isOpen,
  onClose,
  onSave,
  pages,
  isLoading = false,
  bottomSheet = false,
}: InactivePagesModalProps) {
  const {
    selectedUrls,
    searchQuery,
    filteredPages,
    isAllSelected,
    setSearchQuery,
    togglePageSelection,
    toggleAllPages,
    handleSave,
  } = useInactivePagesModal({
    isOpen,
    pages,
    onSave,
    onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[37.4rem] sm:max-w-[57.4rem] lg:max-w-[69.6rem] rounded-t-[2.4rem] sm:rounded-[0.8rem] flex flex-col max-h-[98vh]"
      overflow={false}
      bottomSheet={bottomSheet}
    >
      <div className="flex-shrink-0">
        <InactivePagesModalHeader onClose={onClose} />
      </div>

      <div className="flex-1 overflow-y-auto px-[2rem] sm:px-[1.5rem] lg:px-[4rem] max-h-[70rem] pb-[15rem]">
        <div className="pt-[1.6rem] sm:pt-[2rem]">
          <InactivePagesSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <InactivePagesList
            pages={filteredPages}
            selectedUrls={selectedUrls}
            onPageSelectionToggle={togglePageSelection}
            isAllSelected={isAllSelected}
            onToggleAll={toggleAllPages}
          />
        </div>
      </div>

      <div className="flex-shrink-0 sm:pb-[2.4rem] px-[2rem] sm:px-[1.5rem] lg:px-[4rem] pt-[1.5rem] sticky bottom-0 bg-primary rounded-[0.8rem]">
        <InactivePagesModalActions
          onClose={onClose}
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
}
