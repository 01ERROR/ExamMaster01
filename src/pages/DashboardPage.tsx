import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Edit, Users, Clock, Calendar, Book, BarChart } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TestCard } from '../components/dashboard/TestCard';

// Mock data for tests
const upcomingTests = [
  {
    id: '1',
    title: 'Midterm Examination',
    description: 'Comprehensive test covering all material from weeks 1-5',
    createdBy: '1',
    questions: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
    timeLimit: 60,
    passingScore: 70,
    randomizeQuestions: true,
    showResults: true,
    requireProctoring: true,
    startDate: new Date(Date.now() + 86400000), // tomorrow
    endDate: new Date(Date.now() + 172800000), // day after tomorrow
  },
  {
    id: '2',
    title: 'Weekly Quiz #3',
    description: 'Quick assessment on this week\'s material',
    createdBy: '1',
    questions: ['q11', 'q12', 'q13', 'q14', 'q15'],
    timeLimit: 15,
    passingScore: 60,
    randomizeQuestions: true,
    showResults: true,
    requireProctoring: false,
    startDate: new Date(Date.now() + 259200000), // 3 days from now
    endDate: new Date(Date.now() + 345600000), // 4 days from now
  },
];

const availableTests = [
  {
    id: '3',
    title: 'Practice Test: Module 2',
    description: 'Self-assessment to prepare for the upcoming exam',
    createdBy: '1',
    questions: ['q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28'],
    timeLimit: 30,
    passingScore: 0, // practice test, no passing score
    randomizeQuestions: true,
    showResults: true,
    requireProctoring: false,
  },
];

const completedTests = [
  {
    id: '4',
    title: 'Weekly Quiz #2',
    description: 'Assessment on last week\'s material',
    createdBy: '1',
    questions: ['q31', 'q32', 'q33', 'q34', 'q35'],
    timeLimit: 15,
    passingScore: 60,
    randomizeQuestions: true,
    showResults: true,
    requireProctoring: false,
    score: 80,
  },
  {
    id: '5',
    title: 'Module 1 Final',
    description: 'Comprehensive assessment of Module 1',
    createdBy: '1',
    questions: ['q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48', 'q49', 'q50'],
    timeLimit: 45,
    passingScore: 70,
    randomizeQuestions: true,
    showResults: true,
    requireProctoring: true,
    score: 65,
  },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Please log in to access the dashboard</h2>
          <div className="mt-4">
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Student dashboard
  if (user.role === 'student') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's an overview of your tests and activities.</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tests</p>
                <p className="text-2xl font-semibold">{upcomingTests.length + availableTests.length + completedTests.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Tests</p>
                <p className="text-2xl font-semibold">{upcomingTests.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <BarChart size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-2xl font-semibold">
                  {completedTests.length > 0 
                    ? `${Math.round(completedTests.reduce((acc, test) => acc + (test.score || 0), 0) / completedTests.length)}%` 
                    : 'N/A'}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Available tests */}
        {availableTests.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Available Tests</h2>
              <Link to="/tests" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTests.map(test => (
                <TestCard key={test.id} test={test} status="available" />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming tests */}
        {upcomingTests.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Tests</h2>
              <Link to="/tests" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTests.map(test => (
                <TestCard key={test.id} test={test} status="upcoming" />
              ))}
            </div>
          </div>
        )}

        {/* Recent results */}
        {completedTests.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Results</h2>
              <Link to="/test-results" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTests.map(test => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  status="completed"
                  score={test.score}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Teacher/Admin dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Manage your tests and monitor student performance.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tests Created</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="text-2xl font-semibold">48</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <Book size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Questions</p>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Tests</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Test</h3>
              <p className="text-gray-600 mb-4">Design a new test with various question types and settings</p>
              <Link to="/create-test">
                <Button>Create Test</Button>
              </Link>
            </CardBody>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="p-4 rounded-full bg-green-100 text-green-600 mb-4">
                <Edit size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Question Bank</h3>
              <p className="text-gray-600 mb-4">Add, edit, or organize questions in your question bank</p>
              <Link to="/question-bank">
                <Button>Manage Questions</Button>
              </Link>
            </CardBody>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="p-4 rounded-full bg-amber-100 text-amber-600 mb-4">
                <BarChart size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">View Analytics</h3>
              <p className="text-gray-600 mb-4">See detailed reports on test performance and student progress</p>
              <Link to="/analytics">
                <Button>View Reports</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          <div className="divide-y divide-gray-200">
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-900">You created a new test: <span className="font-medium">Midterm Examination</span></p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users size={20} className="text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-900"><span className="font-medium">15 students</span> completed "Weekly Quiz #2"</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Edit size={20} className="text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-900">You added <span className="font-medium">12 new questions</span> to the question bank</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <BarChart size={20} className="text-amber-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-900">Performance report for <span className="font-medium">Module 1 Final</span> is now available</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};