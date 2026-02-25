import ImageComponent from "../../../ui/ImageComponent";

interface Props {
  image: string;
}

export default function TriggerSchedule({ image }: Props) {
  return (
    <ImageComponent
      src={image}
      alt="automations illustration"
      width={270}
      height={120}
      className="mt-[20rem] scale-80"
    />
  );
}