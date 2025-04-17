'use client';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs = ({ items, activeTab, onTabChange }: TabsProps) => {
  return (
    <ul className="tabs">
      {items.map((item) => (
        <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
          <a onClick={() => onTabChange(item.id)}>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}; 