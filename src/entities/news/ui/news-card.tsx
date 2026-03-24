"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "../model/types";

const categoryConfig = {
  notice: {
    label: "공지",
    className: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  tip: {
    label: "교육팁",
    className: "bg-accent/10 text-accent-foreground hover:bg-accent/20",
  },
  trend: {
    label: "트렌드",
    className: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
};

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const config = categoryConfig[news.category];

  return (
    <Link
      href={news.href}
      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="secondary" className={config.className}>
            {config.label}
          </Badge>
          {news.isNew && (
            <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5">
              NEW
            </Badge>
          )}
        </div>
        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {news.title}
        </h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {news.description}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
    </Link>
  );
}
