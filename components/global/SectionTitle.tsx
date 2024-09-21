import { Separator } from "../ui/separator";
function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-4 mt-[-42px]">
        {text}
      </h2>
      <Separator/>
    </div>
  );
}

export default SectionTitle;
