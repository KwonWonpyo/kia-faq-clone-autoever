type AccordionProps = {
  children: React.ReactNode;
};

export const Accordion = ({ children }: AccordionProps) => (
  <div className="divide-y divide-gray-200">{children}</div>
);
