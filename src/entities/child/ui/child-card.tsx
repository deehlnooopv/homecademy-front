"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Child } from "../model/types";

interface ChildCardProps {
  child: Child;
}

export function ChildCard({ child }: ChildCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/10">
            <AvatarImage src={child.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {child.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground">{child.name}</h3>
              <Badge variant="secondary" className="text-xs font-medium">
                {child.grade}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {child.todayLearningTime}분 / {child.todayGoalTime}분
              </span>
              <span className="flex items-center gap-1 text-accent">
                <Flame className="h-3.5 w-3.5" />
                {child.streak}일 연속
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">오늘의 학습</span>
                <span className="font-semibold text-primary">
                  {child.todayProgress}%
                </span>
              </div>
              <Progress value={child.todayProgress} className="h-2" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                <span className="text-muted-foreground">강점:</span>
                <span className="font-medium text-foreground">
                  {child.topTalent}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <Link href={`/dashboard/${child.id}`}>
                  상세보기
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
