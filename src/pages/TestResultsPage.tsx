import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, FileText, Clock, AlertTriangle, BarChart2, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { QuestionView } from '../components/test/QuestionView';
import { Test, Question, TestAttempt } from '../types';

// Mock data for test and questions (same as TakeTestPage)
const mockTest: Test = {
  id: '3',
  title: 'Practice Test: Module 2',
  description: 'Self-assessment to prepare for the upcoming exam',
  createdBy: '1',
  questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
  timeLimit: 30,
  passingScore: 70,
  randomizeQuestions: true,
  showResults: true,
  requireProctoring: true,
};

const mockQuestions: Record<string, Question> = {
  q1: {
    id: 'q1',
    type: 'multiple-choice',
    content: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    difficulty: 'easy',
    points: 1,
    explanation: 'Paris is the capital and most populous city of France.',
  },
  q2: {
    id: 'q2',
    type: 'true-false',
    content: 'The Earth is flat.',
    correctAnswer: 'false',
    difficulty: 'easy',
    points: 1,
    explanation: 'The Earth is approximately spherical in shape.',
  },
  q3: {
    id: 'q3',
    type: 'short-answer',
    content: 'What element has the chemical symbol "O"?',
    correctAnswer: 'Oxygen',
    difficulty: 'medium',
    points: 2,
    explanation: 'Oxygen is represented by the symbol "O" on the periodic table.',
  },
  q4: {
    id: 'q4',
    type: 'multiple-choice',
    content: 'Which of the following is NOT a programming language?',
    options: ['Java', 'Python', 'HTML', 'C++'],
    correctAnswer: 'HTML',
    difficulty: 'medium',
    points: 2,
    explanation: 'HTML is a markup language, not a programming language.',
  },
  q5: {
    id: 'q5',
    type: 'essay',
    content: 'Explain the concept of object-oriented programming and its key principles.',
    correctAnswer: 'Object-oriented programming (OOP) is a programming paradigm that uses "objects" to design applications and programs. The main principles of OOP are encapsulation, inheritance, polymorphism, and abstraction.',
    difficulty: 'hard',
    points: 5,
    explanation: 'A comprehensive answer should cover all four main principles and provide examples.',
  },
};

// Mock test attempt with user answers
const mockTestAttempt: TestAttempt = {
  id: 'attempt1',
  testId: '3',
  userId: '2',
  startTime: new Date(Date.now() - 1800000), // 30 minutes ago
  endTime: new Date(Date.now() - 600000),    // 10 minutes ago
  answers: [
    {
      questionId: 'q1',
      answer: 'Paris',
      isCorrect: true,
      points: 1,
    },
    {
      questionId: 'q2',
      answer: 'true',
      isCorrect: false,
      points: 0,
    },
    {
      questionId: 'q3',
      answer: 'Oxygen',
      isCorrect: true,
      points: 2,
    },
    {
      questionId: 'q4',
      answer: 'Java',
      isCorrect: false,
      points: 0,
    },
    {
      questionId: 'q5',
      answer: 'Object-oriented programming uses objects to model real-world things and provides a way to structure programs. The main principles are encapsulation (bundling data with methods), inheritance (creating new classes based on existing ones), polymorphism (different classes can be used with the same interface), and abstraction (simplifying complex systems).',
      isCorrect: true,
      points: 4,
      manuallyGraded: true,
      feedback: 'Good explanation, but could have provided more examples of each principle in practice.',
    },
  ],
  score: 70,
  completed: true,
  proctorFlags: [
    {
      timestamp: new Date(Date.now() - 1200000),
      type: 'tab-switch',
    },
  ],
};

export const TestResultsPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  
  // Load test data
  useEffect(() => {
    // Simulate API call to load test
    setTimeout(() => {
      setTest(mockTest);
      
      // Get questions for this test
      const testQuestions = mockTest.questions.map(qId => mockQuestions[qId]);
      setQuestions(testQuestions);
      
      setAttempt(mockTestAttempt);
      
      // Initialize expanded state
      const expanded: Record<string, boolean> = {};
      testQuestions.forEach(q => {
        expanded[q.id] = false;
      });
      setExpandedQuestions(expanded);
    }, 500);
  }, [testId]);

  const toggleQuestionExpanded = (questionId: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  if (!test || !questions.length || !attempt) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center mt-4 text-gray-600">Loading test results...</p>
      </div>
    );
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = attempt.answers.reduce((sum, a) => sum + (a.points || 0), 0);
  const percentScore = Math.round((earnedPoints / totalPoints) * 100);
  const passed = percentScore >= test.passingScore;
  
  // Calculate performance by difficulty
  const difficultyPerformance = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
    expert: { correct: 0, total: 0 },
  };
  
  attempt.answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const difficulty = question.difficulty;
      difficultyPerformance[difficulty].total++;
      if (answer.isCorrect) {
        difficultyPerformance[difficulty].correct++;
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ChevronUp size={16} className="mr-1 transform rotate-90" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{test.title} - Results</h1>
            <p className="text-gray-600">{test.description}</p>
          </div>
          
          {/* Results summary */}
          <Card className="mb-8">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Test Summary</h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={`p-4 rounded-full ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mr-4`}>
                    {passed ? <CheckCircle size={24} /> : <XCircle size={24} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {passed ? 'Test Passed' : 'Test Failed'}
                    </h3>
                    <p className="text-gray-600">
                      Score: {percentScore}% (Passing: {test.passingScore}%)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-4 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Points</h3>
                    <p className="text-gray-600">
                      {earnedPoints} / {totalPoints} points earned
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-md font-medium text-gray-900 mb-3">Test Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-sm text-gray-600">
                        {attempt.endTime && attempt.startTime ? 
                          `${Math.round((attempt.endTime.getTime() - attempt.startTime.getTime()) / 60000)} minutes` : 
                          'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText size={18} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Questions</p>
                      <p className="text-sm text-gray-600">{questions.length} total</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BarChart2 size={18} className="text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Correct Answers</p>
                      <p className="text-sm text-gray-600">
                        {attempt.answers.filter(a => a.isCorrect).length} of {questions.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {attempt.proctorFlags && attempt.proctorFlags.length > 0 && (
                <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                  <div className="flex">
                    <AlertTriangle size={20} className="text-amber-500 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-md font-medium text-amber-800 mb-1">Proctoring Flags</h3>
                      <p className="text-sm text-amber-700">
                        {attempt.proctorFlags.length} suspicious {attempt.proctorFlags.length === 1 ? 'activity was' : 'activities were'} detected during your test.
                      </p>
                      <ul className="mt-2 list-disc list-inside text-sm text-amber-700">
                        {attempt.proctorFlags.map((flag, index) => (
                          <li key={index}>
                            {flag.type === 'tab-switch' && 'Browser tab switch detected'}
                            {flag.type === 'face-not-visible' && 'Face not visible in camera'}
                            {flag.type === 'multiple-faces' && 'Multiple faces detected'}
                            {flag.type === 'voice-detected' && 'Voice detected during test'}
                            {flag.type === 'suspicious-movement' && 'Suspicious movement detected'}
                            {' at '}
                            {flag.timestamp.toLocaleTimeString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
          
          {/* Questions and answers */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions & Answers</h2>
            
            {questions.map((question, index) => {
              const answer = attempt.answers.find(a => a.questionId === question.id);
              const isExpanded = expandedQuestions[question.id];
              
              return (
                <Card key={question.id} className="mb-4">
                  <div 
                    className={`flex justify-between items-center p-4 cursor-pointer ${answer?.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                    onClick={() => toggleQuestionExpanded(question.id)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 font-semibold">{index + 1}.</span>
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">{question.content}</div>
                        <div className="flex space-x-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            question.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' :
                            question.difficulty === 'hard' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                            {question.points} {question.points === 1 ? 'point' : 'points'}
                          </span>
                          {answer && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {answer.points} / {question.points} points
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {answer?.isCorrect ? 
                        <CheckCircle size={20} className="text-green-600 mr-2" /> : 
                        <XCircle size={20} className="text-red-600 mr-2" />
                      }
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-4 border-t border-gray-200">
                      <QuestionView
                        question={question}
                        currentAnswer={answer?.answer || ''}
                        onChange={() => {}} // Read-only mode
                        showAnswer={true}
                      />
                      
                      {answer?.manuallyGraded && answer?.feedback && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm font-semibold text-blue-800">Instructor Feedback:</p>
                          <p className="text-sm text-blue-800">{answer.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3">
          <Card className="mb-6 sticky top-6">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Performance Analysis</h2>
            </CardHeader>
            <CardBody className="p-6">
              {/* Overall score visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Overall Score</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Your Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {percentScore}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div 
                      style={{ width: `${percentScore}%` }} 
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        passed ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>0%</span>
                    <span className={`${test.passingScore <= percentScore ? 'text-green-600' : 'text-red-600'}`}>
                      {test.passingScore}% (Passing)
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              
              {/* Performance by difficulty */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Performance by Difficulty</h3>
                {Object.entries(difficultyPerformance).map(([difficulty, data]) => {
                  if (data.total === 0) return null;
                  
                  const percentage = Math.round((data.correct / data.total) * 100);
                  const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
                  
                  return (
                    <div key={difficulty} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{difficultyName}</span>
                        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            percentage >= 80 ? 'bg-green-600' :
                            percentage >= 60 ? 'bg-blue-600' :
                            percentage >= 40 ? 'bg-amber-500' : 'bg-red-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {data.correct} of {data.total} correct
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Action buttons */}
              <div className="space-y-3">
                <Button variant="secondary" fullWidth>
                  Print Results
                </Button>
                <Button variant="ghost" fullWidth>
                  Review Incorrect Answers
                </Button>
                <Link to="/dashboard">
                  <Button fullWidth>
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};