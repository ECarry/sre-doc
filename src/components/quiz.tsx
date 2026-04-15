'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

export type QuestionType = 'boolean' | 'single' | 'multiple';

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

function QuizQuestionItem({ question, index }: { question: QuizQuestion; index: number }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.type === 'multiple' ? [] : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    let correct = false;
    
    if (question.type === 'multiple') {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer.sort() : [];
      const correct_answers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.sort() 
        : [question.correctAnswer];
      correct = JSON.stringify(selected) === JSON.stringify(correct_answers);
    } else {
      correct = selectedAnswer === question.correctAnswer;
    }
    
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswer(question.type === 'multiple' ? [] : '');
    setSubmitted(false);
    setIsCorrect(false);
  };

  const handleOptionChange = (value: string) => {
    if (submitted) return;

    if (question.type === 'multiple') {
      const current = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      if (current.includes(value)) {
        setSelectedAnswer(current.filter(v => v !== value));
      } else {
        setSelectedAnswer([...current, value]);
      }
    } else {
      setSelectedAnswer(value);
    }
  };

  const isSelected = (value: string) => {
    if (question.type === 'multiple') {
      return Array.isArray(selectedAnswer) && selectedAnswer.includes(value);
    }
    return selectedAnswer === value;
  };

  const canSubmit = question.type === 'multiple' 
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : selectedAnswer !== '';

  const getBooleanOptions = (): QuizOption[] => [
    { label: '正确', value: 'true' },
    { label: '错误', value: 'false' }
  ];

  const options = question.type === 'boolean' ? getBooleanOptions() : question.options || [];

  return (
    <div className="border rounded-lg p-6 mb-4 bg-card">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          {index + 1}
        </span>
        <div className="flex-1">
          <p className="text-base font-medium mb-1">{question.question}</p>
          <p className="text-xs text-muted-foreground">
            {question.type === 'boolean' && '判断题'}
            {question.type === 'single' && '单选题'}
            {question.type === 'multiple' && '多选题'}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {options.map((option) => {
          const selected = isSelected(option.value);
          const showCorrect = submitted && (
            question.type === 'multiple'
              ? Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option.value)
              : question.correctAnswer === option.value
          );

          return (
            <label
              key={option.value}
              className={`
                flex items-center gap-3 p-3 rounded-md border-2 cursor-pointer transition-all
                ${submitted ? 'cursor-not-allowed' : 'hover:border-primary/50'}
                ${selected && !submitted ? 'border-primary bg-primary/5' : 'border-border'}
                ${submitted && showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''}
                ${submitted && selected && !showCorrect ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}
              `}
            >
              <input
                type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                name={`question-${question.id}`}
                value={option.value}
                checked={selected}
                onChange={() => handleOptionChange(option.value)}
                disabled={submitted}
                className="w-4 h-4 accent-primary"
              />
              <span className="flex-1 text-sm">{option.label}</span>
              {submitted && showCorrect && (
                <Check className="w-5 h-5 text-green-600" />
              )}
              {submitted && selected && !showCorrect && (
                <X className="w-5 h-5 text-red-600" />
              )}
            </label>
          );
        })}
      </div>

      {submitted && (
        <div className={`
          p-4 rounded-md mb-4 border-l-4
          ${isCorrect 
            ? 'bg-green-50 dark:bg-green-950/20 border-green-500' 
            : 'bg-red-50 dark:bg-red-950/20 border-red-500'
          }
        `}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900 dark:text-green-100">回答正确!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-900 dark:text-red-100">回答错误</span>
              </>
            )}
          </div>
          {question.explanation && (
            <p className="text-sm text-muted-foreground mt-2">
              <strong>解析：</strong>{question.explanation}
            </p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitted}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          提交答案
        </button>
        {submitted && (
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent transition-colors"
          >
            重新作答
          </button>
        )}
      </div>
    </div>
  );
}

export function Quiz({ title = '练习题', questions }: QuizProps) {
  const [showAll, setShowAll] = useState(false);
  const displayQuestions = showAll ? questions : questions.slice(0, 3);

  return (
    <div className="my-8 p-6 border rounded-lg bg-card/50">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl">📝</span>
        {title}
      </h3>
      
      <div>
        {displayQuestions.map((question, index) => (
          <QuizQuestionItem key={question.id} question={question} index={index} />
        ))}
      </div>

      {questions.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-sm text-primary hover:underline"
        >
          {showAll ? '收起题目' : `显示全部 ${questions.length} 道题目`}
        </button>
      )}
    </div>
  );
}
