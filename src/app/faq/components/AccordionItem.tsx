import { useState } from "react";

type Props = {
  question: string;
  answer: string;
};

export const AccordionItem = ({ question, answer }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full text-left py-4 font-semibold"
        onClick={() => setOpen(!open)}
      >
        {question}
      </button>
      {open && <div className="px-4 pb-4 text-gray-700">{answer}</div>}
    </div>
  );
};
