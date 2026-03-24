// News entity types
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: "notice" | "tip" | "trend";
  date: Date;
  href: string;
  isNew?: boolean;
}

export interface AITip {
  id: string;
  childName: string;
  tip: string;
  category: string;
}
