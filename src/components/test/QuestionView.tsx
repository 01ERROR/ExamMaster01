import React, { useState } from 'react';
import { Question } from '../../types';

interface QuestionViewProps {
  question: Question;
  currentAnswer: string | string[];
  onChange: (answer: string | string[]) => void;
  timeRemaining?: number;
  showAnswer?: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentAnswer,
  onChange,
  showAnswer = false,
}) => {
  const handleMultipleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleMultipleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Array.isArray(currentAnswer)) {
      if (event.target.checked) {
        onChange([...currentAnswer, value]);
      } else {
        onChange(currentAnswer.filter(item => item !== value));
      }
    } else {
      onChange(event.target.checked ? [value] : []);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={handleMultipleChoiceChange}
                  className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
                {showAnswer && option === question.correctAnswer && (
                  <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>
                )}
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="true"
                checked={currentAnswer === 'true'}
                onChange={handleMultipleChoiceChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">True</span>
              {showAnswer && question.correctAnswer === 'true' && (
                <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>
              )}
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="false"
                checked={currentAnswer === 'false'}
                onChange={handleMultipleChoiceChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">False</span>
              {showAnswer && question.correctAnswer === 'false' && (
                <span className="ml-2 text-green-600 text-sm font-medium">✓ Correct</span>
              )}
            </label>
          </div>
        );

      case 'short-answer':
        return (
          <div>
            <input
              type="text"
              value={currentAnswer as string || ''}
              onChange={handleTextChange}
              placeholder="Enter your answer here..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showAnswer && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">Correct answer:</p>
                <p className="text-gray-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      case 'essay':
        return (
          <div>
            <textarea
              value={currentAnswer as string || ''}
              onChange={handleTextChange}
              placeholder="Enter your answer here..."
              rows={8}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showAnswer && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">Model answer:</p>
                <p className="text-gray-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        );

      case 'matching':
        return (
          <div>
            <p className="text-sm text-gray-500 mb-3">Match the items by selecting the correct options.</p>
            {/* In a real app, this would be more complex with a drag-and-drop interface */}
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg">
                  <span className="text-gray-700 mb-2 sm:mb-0">{option}</span>
                  <select
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={Array.isArray(currentAnswer) ? currentAnswer[index] : ''}
                    onChange={(e) => {
                      const newAnswers = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
                      newAnswers[index] = e.target.value;
                      onChange(newAnswers);
                    }}
                  >
                    <option value="">Select a match</option>
                    {/* This would typically be another set of options to match with */}
                    {question.options?.map((matchOption, matchIndex) => (
                      <option key={matchIndex} value={matchOption}>
                        {matchOption}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            question.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' :
            question.difficulty === 'hard' ? 'bg-amber-100 text-amber-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {question.points} {question.points === 1 ? 'point' : 'points'}
          </span>
        </div>
      </div>
      
      <div className="text-lg font-medium text-gray-900">{question.content}</div>
      
      <div className="mt-4">{renderQuestion()}</div>
      
      {showAnswer && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-800">Explanation:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};