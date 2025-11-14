import React, { useState, useRef } from "react";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "./ImageComponent";
import CloseModalButton from "../modal/CloseModalButton";
import Heading from "./Heading";
import Text from "./Text";
import Button from "./Button";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const icons = useSupabaseIcons();

  const getModalPosition = () => {
    if (!buttonRef.current) return "bottom-left";
    
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceBottom = window.innerHeight - rect.bottom;
    
    const vertical = spaceBottom < 300 ? "bottom-0" : "top-0";
    const horizontal = spaceRight < 300 ? "right-0" : "left-0";
    
    return `${vertical} ${horizontal}`;
  };

  return (
    <div className="relative" ref={buttonRef}>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-destructive flex items-center gap-[.5rem] text-white font-[600] text-[1.5rem] px-[1.6rem] py-[1rem] rounded-[0.8rem]"
      >
        <ImageComponent src={icons.logout} alt={""} width={20} height={20} />
        <span>Logout</span>
      </button>

      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className={`absolute ${getModalPosition()} z-[101]`}>
            <div className="bg-primary min-w-[58rem] p-[2.4rem] rounded-[1.2rem]">
              <div className="flex items-center justify-between mb-[1rem]">
                <div className="bg-destructive/5 p-[10px] rounded-full">
                  <div className="bg-destructive/7 p-[1.2rem] rounded-full">
                    <ImageComponent
                      src={icons.logoutRed}
                      alt={""}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <CloseModalButton onClick={() => setIsModalOpen(false)} />
              </div>

              <Heading>Are you sure you want to log out of your account</Heading>
              <Text size="sm">
                Continuing with this action will see you logged out of your account
              </Text>

              <div className="flex items-center gap-[1rem] mt-[2rem]">
                <Button
                  variant="secondary"
                  className="w-full py-[1rem] rounded-[0.8rem] font-[700] text-[1.6rem]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="w-full py-[1rem] rounded-[0.8rem] font-[700] text-[1.6rem]"
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}