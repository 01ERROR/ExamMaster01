import React from 'react';
import { Clock, Award, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Test } from '../../types';
import { useNavigate } from 'react-router-dom';

interface TestCardProps {
  test: Test;
  status?: 'upcoming' | 'available' | 'completed' | 'missed';
  score?: number;
}

export const TestCard: React.FC<TestCardProps> = ({ test, status = 'available', score }) => {
  const navigate = useNavigate();
  
  const handleStartTest = () => {
    navigate(`/take-test/${test.id}`);
  };
  
  const handleViewResults = () => {
    navigate(`/test-results/${test.id}`);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'upcoming':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>;
      case 'available':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Available</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Completed</span>;
      case 'missed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Missed</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full transition-transform duration-200 hover:translate-y-[-4px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
        {getStatusBadge()}
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm text-gray-600">{test.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2 text-gray-400" />
            <span>{test.timeLimit} minutes</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText size={16} className="mr-2 text-gray-400" />
            <span>{test.questions.length} questions</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award size={16} className="mr-2 text-gray-400" />
            <span>Pass: {test.passingScore}%</span>
          </div>
          {test.requireProctoring && (
            <div className="flex items-center text-sm text-amber-600">
              <AlertTriangle size={16} className="mr-2" />
              <span>Proctored</span>
            </div>
          )}
        </div>
        
        {status === 'completed' && score !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Your score</span>
              <span className="text-sm font-medium text-gray-700">{score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  score >= test.passingScore ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-right text-gray-500">
              {score >= test.passingScore ? 'Passed' : 'Failed'}
            </div>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex justify-end space-x-2">
        {status === 'available' && (
          <Button onClick={handleStartTest}>Start Test</Button>
        )}
        {status === 'upcoming' && (
          <p className="text-sm text-gray-600 italic">Available soon</p>
        )}
        {status === 'completed' && (
          <Button variant="secondary" onClick={handleViewResults}>View Results</Button>
        )}
        {status === 'missed' && (
          <p className="text-sm text-red-600 italic">Test period ended</p>
        )}
      </CardFooter>
    </Card>
  );
};