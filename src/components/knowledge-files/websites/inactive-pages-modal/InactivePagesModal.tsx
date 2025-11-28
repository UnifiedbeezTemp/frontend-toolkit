import { useState, useEffect } from "react";
import InactivePagesModalHeader from "./InactivePagesModalHeader";
import InactivePagesSearch from "./InactivePagesSearch";
import InactivePagesList from "./InactivePagesList";
import InactivePagesModalActions from "./InactivePagesModalActions";
import { WebsitePage } from "../utils/types";
import Modal from "../../../modal/Modal";

interface InactivePagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedUrls: string[]) => void;
  pages: WebsitePage[];
}

export default function InactivePagesModal({
  isOpen,
  onClose,
  onSave,
  pages,
}: InactivePagesModalProps) {
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      const activePageUrls = pages
        .filter(page => page.status === "active")
        .map(page => page.url);
      setSelectedUrls(new Set(activePageUrls));
    }
  }, [isOpen, pages]);

  const filteredPages = pages.filter(page =>
    page.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePageSelection = (pageUrl: string) => {
    setSelectedUrls(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pageUrl)) {
        newSet.delete(pageUrl);
      } else {
        newSet.add(pageUrl);
      }
      return newSet;
    });
  };

  const toggleAllPages = () => {
    if (selectedUrls.size === filteredPages.length) {
      setSelectedUrls(new Set());
    } else {
      setSelectedUrls(new Set(filteredPages.map(page => page.url)));
    }
  };

  const handleSave = () => {
    onSave(Array.from(selectedUrls));
    onClose();
  };

  const isAllSelected = selectedUrls.size === filteredPages.length && filteredPages.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-[37.4rem] sm:max-w-[57.4rem] lg:max-w-[69.6rem] overflow-y-scroll max-h-[98vh] rounded-[2.4rem] sm:rounded-[0.8rem]">
      <InactivePagesModalHeader onClose={onClose} />
      
      <div className="pt-[1.6rem] sm:pt-[2rem] pb-[1.4rem] sm:pb-[2.4rem] px-[2rem] sm:px-[1.5rem] lg:px-[4rem]">
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

        <InactivePagesModalActions 
          onClose={onClose}
          onSave={handleSave}
        />
      </div>
    </Modal>
  );
}