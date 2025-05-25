export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  difficulty: DifficultyLevel;
  points: number;
  explanation?: string;
  category?: string;
  tags?: string[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  questions: string[];
  timeLimit: number; // in minutes
  passingScore: number;
  randomizeQuestions: boolean;
  showResults: boolean;
  requireProctoring: boolean;
  startDate?: Date;
  endDate?: Date;
  attempts?: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  answers: {
    questionId: string;
    answer: string | string[];
    isCorrect?: boolean;
    points?: number;
    manuallyGraded?: boolean;
    feedback?: string;
  }[];
  score?: number;
  completed: boolean;
  proctorFlags?: ProctorFlag[];
}

export interface ProctorFlag {
  timestamp: Date;
  type: 'tab-switch' | 'face-not-visible' | 'multiple-faces' | 'voice-detected' | 'suspicious-movement';
  evidence?: string; // could be a screenshot URL or description
}