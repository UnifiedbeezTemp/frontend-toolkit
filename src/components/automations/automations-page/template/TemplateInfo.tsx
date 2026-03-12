import Text from "../../../ui/Text";

interface ListSection {
  title: string;
  list: string[];
  ordered: boolean;
}

interface Props {
  description: string;
  lists: ListSection[];
}

export default function TemplateInfo({ description, lists }: Props) {
  return (
    <div className="overflow-auto space-y-[1.6rem]">
      <Text>{description}</Text>
      <Text className="">🔧 What This Does:</Text>

      {lists.map((section, i) => (
        <div key={i} className="">
          <Text className="mb-[1.6rem]">{section.title}</Text>
          {section.ordered ? (
            <ol className="list-decimal list-inside space-y-1 text-text-primary">
              {section.list.map((item, j) => (
                <li key={j} className="text-[1.6rem]">
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-text-primary">
              {section.list.map((item, j) => (
                <li key={j} className="text-[1.6rem]">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
