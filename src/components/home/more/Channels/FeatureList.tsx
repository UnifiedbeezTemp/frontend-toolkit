import FeatureItem from "../FeatureItem";
import { channelsFeatures } from "../utils/data";

export default function FeatureList() {
  return (
    <div className="space-y-5 my-[2.3rem]">
      {channelsFeatures.map((f, i) => (
        <FeatureItem key={i} title={f.title} text={f.text} />
      ))}
    </div>
  );
}
