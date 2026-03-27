'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HexagonSkillChart } from '@/components/child-detail/hexagon-skill-chart';
import { AIRecommendationCard } from '@/components/child-detail/ai-recommendation-card';
import { SubjectLearningCard } from '@/components/child-detail/subject-learning-card';

interface ChildDetailPageProps {
  params: {
    id: string;
  };
}

const mockChildData = {
  id: '1',
  name: 'Kim Suhyun',
  age: 8,
  skills: [
    { category: 'Math', value: 85, fullMark: 100 },
    { category: 'Creativity', value: 78, fullMark: 100 },
    { category: 'Problem Solving', value: 82, fullMark: 100 },
    { category: 'Language', value: 88, fullMark: 100 },
    { category: 'Thinking', value: 75, fullMark: 100 },
    { category: 'Interest', value: 90, fullMark: 100 },
  ],
  recommendations: [
    {
      id: 'course-1',
      title: 'Creative Math with AI',
      description: 'Strengthen math fundamentals while developing creative thinking skills.',
      reason: 'Suhyun has excellent math scores but would benefit from diverse problem-solving approaches. This course combines logical thinking with creativity.',
      subject: 'Math',
      level: 'Beginner-Intermediate',
    },
    {
      id: 'course-2',
      title: 'Science Explorer Project',
      description: 'Project-based learning exploring real-world science phenomena.',
      reason: 'Thinking skills need development. Science exploration through inquiry-based learning can help significantly. With high interest levels, this is a great choice.',
      subject: 'Science',
      level: 'Intermediate',
    },
  ],
  subjects: [
    {
      subject: 'Math',
      progress: 75,
      rating: 85,
      strengths: ['Calculation', 'Pattern Recognition'],
      weaknesses: ['Application Problems'],
      challenges: ['Multi-step Problems', 'Creative Approaches'],
      nextFocusPoints: 'We will focus on diverse approaches to application problems. Beyond simple calculations, practice identifying problem intent and trying multiple solution methods.',
    },
    {
      subject: 'Korean',
      progress: 85,
      rating: 88,
      strengths: ['Reading', 'Vocabulary'],
      weaknesses: ['Creative Writing'],
      challenges: ['Writing Expression'],
      nextFocusPoints: 'Given Suhyun excellent reading skills, we will focus on developing creative writing. We will improve expression skills through writing practice on various topics.',
    },
    {
      subject: 'English',
      progress: 60,
      rating: 72,
      strengths: ['Listening', 'Pronunciation'],
      weaknesses: ['Writing', 'Grammar'],
      challenges: ['Sentence Structure Understanding'],
      nextFocusPoints: 'We will review basic grammar and gradually improve writing skills through real-life sentence creation practice. Game-based learning will help maintain motivation.',
    },
  ],
};

export default function ChildDetailPage({ params }: ChildDetailPageProps) {
  const router = useRouter();
  const [child] = useState(mockChildData);

  const handleNavigateToCourse = (courseId: string) => {
    console.log('[v0] Navigating to course:', courseId);
    router.push(`/dashboard/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
            <p className="text-gray-600">{child.age} years old • Learning Analysis</p>
          </div>
        </div>

        {/* Skill Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <HexagonSkillChart 
            data={child.skills} 
            childName={child.name}
          />
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">AI Teachers Recommended Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {child.recommendations.map(rec => (
              <AIRecommendationCard 
                key={rec.id}
                recommendation={rec}
                onNavigate={handleNavigateToCourse}
              />
            ))}
          </div>
        </div>

        {/* Subject Learning Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Subject Learning Status</h2>
          <div className="space-y-4">
            {child.subjects.map(subject => (
              <SubjectLearningCard 
                key={subject.subject}
                card={subject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
