import { useState, useEffect } from "react";
import Modal from "@/shared/src/components/modal/Modal";
import InactivePagesModalHeader from "./InactivePagesModalHeader";
import InactivePagesSearch from "./InactivePagesSearch";
import InactivePagesList from "./InactivePagesList";
import InactivePagesModalActions from "./InactivePagesModalActions";
import { WebsitePage } from "../utils/types";

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <InactivePagesModalHeader onClose={onClose} />
      
      <div className="pt-[2rem] pb-[2.4rem] px-[4rem]">
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