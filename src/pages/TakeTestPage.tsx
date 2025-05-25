import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, CheckSquare, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { QuestionView } from '../components/test/QuestionView';
import { TestTimer } from '../components/test/TestTimer';
import { ProctorControls } from '../components/test/ProctorControls';
import { Test, Question } from '../types';

// Mock data for a test
const mockTest: Test = {
  id: '3',
  title: 'Practice Test: Module 2',
  description: 'Self-assessment to prepare for the upcoming exam',
  createdBy: '1',
  questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
  timeLimit: 30,
  passingScore: 0,
  randomizeQuestions: true,
  showResults: true,
  requireProctoring: true,
};

// Mock questions
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

export const TakeTestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proctorReady, setProctorReady] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  
  // Load test data
  useEffect(() => {
    // Simulate API call to load test
    setTimeout(() => {
      setTest(mockTest);
      
      // Get questions for this test
      const testQuestions = mockTest.questions.map(qId => mockQuestions[qId]);
      setQuestions(testQuestions);
      
      // Initialize answers
      const initialAnswers: Record<string, string | string[]> = {};
      testQuestions.forEach(q => {
        initialAnswers[q.id] = q.type === 'matching' ? [] : '';
      });
      setAnswers(initialAnswers);
    }, 500);
  }, [testId]);

  const handleAnswerChange = (answer: string | string[]) => {
    if (!questions[currentQuestionIndex]) return;
    
    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleQuestionNavClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleTimeUp = () => {
    handleSubmitTest();
  };

  const handleProctorReady = () => {
    setProctorReady(true);
    setTestStarted(true);
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to submit test
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to results page
    navigate(`/test-results/${testId}`);
  };

  if (!test || !questions.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center mt-4 text-gray-600">Loading test...</p>
      </div>
    );
  }

  if (test.requireProctoring && !proctorReady) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
            <p className="text-gray-600">{test.description}</p>
          </CardHeader>
          <CardBody className="p-6">
            <ProctorControls onReady={handleProctorReady} />
          </CardBody>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';
  const answeredQuestionsCount = Object.values(answers).filter(a => 
    (typeof a === 'string' && a.trim() !== '') || 
    (Array.isArray(a) && a.length > 0)
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
            <TestTimer timeLimit={test.timeLimit} onTimeUp={handleTimeUp} />
          </div>
          
          <Card className="mb-6">
            <CardBody className="p-6">
              <QuestionView
                question={currentQuestion}
                currentAnswer={currentAnswer}
                onChange={handleAnswerChange}
              />
            </CardBody>
            <CardFooter className="flex justify-between border-t border-gray-200 bg-gray-50">
              <Button
                variant="ghost"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                leftIcon={<ChevronLeft size={18} />}
              >
                Previous
              </Button>
              
              <Button
                variant="ghost"
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                rightIcon={<ChevronRight size={18} />}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
          
          <div className="flex justify-between mt-8">
            <div className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            
            <div>
              <Button
                variant="success"
                leftIcon={<Save size={18} />}
                onClick={handleSubmitTest}
                isLoading={isSubmitting}
              >
                Submit Test
              </Button>
            </div>
          </div>
          
          {/* Warning if not all questions are answered */}
          {answeredQuestionsCount < questions.length && (
            <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    You have answered {answeredQuestionsCount} out of {questions.length} questions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Card>
            <CardHeader className="border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Question Navigator</h2>
            </CardHeader>
            <CardBody className="p-4">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => {
                  const isAnswered = answers[question.id] && 
                    ((typeof answers[question.id] === 'string' && answers[question.id] !== '') ||
                     (Array.isArray(answers[question.id]) && answers[question.id].length > 0));
                  
                  return (
                    <button
                      key={question.id}
                      className={`
                        w-full aspect-square rounded-md flex items-center justify-center font-medium
                        ${currentQuestionIndex === index ? 'bg-blue-600 text-white' : 
                          isAnswered ? 'bg-green-100 text-green-800 border border-green-300' : 
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      `}
                      onClick={() => handleQuestionNavClick(index)}
                    >
                      {index + 1}
                      {isAnswered && <CheckSquare size={8} className="ml-1" />}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Current Question</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-100 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Unanswered</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-1">Test Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(answeredQuestionsCount / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {answeredQuestionsCount} of {questions.length} questions answered
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};