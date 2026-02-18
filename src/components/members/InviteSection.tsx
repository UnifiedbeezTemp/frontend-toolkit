import Link from "next/link";
import useSession from "../../providers/hooks/useSession";
import { useAppSelector } from "../../store/hooks/useRedux";
import { selectTotalMembers } from "../../store/onboarding/slices/membersSlice";
import Input from "../forms/Input";
import Button from "../ui/Button";
import Text from "../ui/Text";

interface InviteSectionProps {
  emailInput: string;
  error: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddInvite: () => void;
  failedInvitations?: Array<{ email: string; error: string }>;
}

export const InviteSection = ({
  emailInput,
  error,
  onEmailChange,
  onAddInvite,
  failedInvitations = [],
}: InviteSectionProps) => {
  const { data } = useSession();
  const totalMembers = useAppSelector(selectTotalMembers);
  const maxSeats = data?.planFeatures?.maxSeats;
  const isUnlimited = maxSeats === null;
  const seatsLeft = isUnlimited
    ? "Unlimited"
    : Math.max(0, (maxSeats || 0) - totalMembers);

  return (
    <div className="mt-[4rem] sm:mt-[3rem] lg:mt-[2.4rem] w-full">
      <div className="flex items-center gap-[1rem] mb-[0.8rem] w-full">
        <Input
          value={emailInput}
          onChange={onEmailChange}
          placeholder="Emails, comma separated"
          type="text"
          className="w-full text-[1.4rem] lg:text-[1.6rem]"
        />

        <Button
          className="w-[10rem] font-[700] text-[1.6rem] rounded-[0.8rem] lg:min-w-[12.8rem]"
          onClick={onAddInvite}
        >
          Add
        </Button>
      </div>

      {error && <p className="text-destructive text-[14px] mt-2">{error}</p>}

      {failedInvitations.length > 0 && (
        <div className="mt-2 space-y-1">
          {failedInvitations.map((failed, index) => (
            <p key={index} className="text-destructive text-[14px]">
              <span className="font-bold">{failed.email}:</span> {failed.error}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[0.3rem] mt-[0.4rem] sm:mt-[2.4rem] lg:mt-[0.8rem] leading-[2.07rem]">
        <Text size="sm" className="font-[700] inline">
          {seatsLeft} seats left.
        </Text>{" "}
        <div className="flex">
          <div className="text-secondary text-[14px]">
            Need more seats?{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE}/addons`}
              className="text-brand-primary text-[14px] font-[700] underline"
            >
              Add seats from the pricing tab
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
