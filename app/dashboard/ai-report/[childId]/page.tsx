"use client";

import { useParams } from "next/navigation";
import { AIReportDetailView } from "@/src/widgets/ai-report";

export default function AIReportDetailPage() {
  const params = useParams();
  const childId = typeof params.childId === "string" ? params.childId : params.childId?.[0] ?? "";

  return <AIReportDetailView childId={childId} />;
}
