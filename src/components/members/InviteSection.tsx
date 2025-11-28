"use client";

import { Link } from "lucide-react";
import { useState } from "react";
import { useSupabaseImages } from "../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { addInvitedUser, setEmailInput } from "../../store/onboarding/slices/membersSlice";
import Input from "../forms/Input";
import Button from "../ui/Button";
import Text from "../ui/Text";

export default function InviteSection() {
  const dispatch = useAppDispatch();
  const { emailInput, selectedRole } = useAppSelector((state) => state.members);
  const supabaseImages = useSupabaseImages();
  const [error, setError] = useState("");

  const handleAddInvite = () => {
    if (!emailInput.trim()) {
      setError("Please enter email addresses");
      return;
    }

    const emails = emailInput.split(',').map(email => email.trim()).filter(email => email);
    
    if (emails.length === 0) {
      setError("Please enter valid email addresses");
      return;
    }

    const invalidEmails = emails.filter(email => !validateEmail(email));
    
    if (invalidEmails.length > 0) {
      setError(`Invalid email addresses: ${invalidEmails.join(', ')}`);
      return;
    }

    emails.forEach(email => {
      const newUser = {
        id: `inv-${Date.now()}-${email}`,
        email: email,
        avatar: supabaseImages.avatar,
        role: selectedRole,
        status: "pending" as const,
      };
      dispatch(addInvitedUser(newUser));
    });

    dispatch(setEmailInput(""));
    setError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmailInput(e.target.value));
    if (error) setError("");
  };

  return (
    <div className="py-[2.4rem]">
      <div className="flex items-center gap-[1rem] mb-[0.8rem]">
        <Input
          value={emailInput}
          onChange={handleEmailChange}
          placeholder="Emails, comma separated"
          type="text"
        />

        <Button className="w-[20%] font-[700] text-[1.6rem] rounded-[0.8rem]" onClick={handleAddInvite}>
          Add
        </Button>
      </div>

      {error && <p className="text-destructive text-[14px] mt-2">{error}</p>}

      <div className="flex items-center gap-[3px] mt-[4px] leading-[2.07rem]">
        <div className="text-secondary text-[14px]">
          <Text size="sm" className="font-[700] inline">2 seats left.</Text> Need more users?
        </div>

        <Link
          href={"#"}
          className="text-brand-primary text-[14px] font-[700] underline"
        >
          Add seats from the pricing tab
        </Link>
      </div>
    </div>
  );
}