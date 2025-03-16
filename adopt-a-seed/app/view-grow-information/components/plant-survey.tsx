"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { useFetchApi } from "@/lib/use-api";

interface PlantPageProps {
  id: string;
}

type Question = {
  id: number;
  question: string;
  answer: string | null;
};

type PlantStatusDTO = {
  questions: Question[];
  otp_question: Question;
  current_status: string;
  next_status: string;
};

export default function PlantSurvey({ id }: PlantPageProps) {
  const { data: status } = useFetchApi<PlantStatusDTO>(`http://localhost:8000/plants/${id}/status`, {
    requireAuth: true,
    enabled: true,
  });

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (status) {
      setAnswers(extractAnswers(status));
    }
  }, [status]);

  const extractAnswers = (status: PlantStatusDTO) => {
    return status.questions.reduce(
      (acc, q) => {
        if (q.answer) acc[q.id] = q.answer;
        return acc;
      },
      {} as { [key: number]: string },
    );
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const prepareSubmissionData = (): PlantStatusDTO => {
    if (!status) return {} as PlantStatusDTO;
    return {
      ...status,
      questions: status.questions.map((q) => ({
        ...q,
        answer: answers[q.id] || null,
      })),
    };
  };

  const handleSubmit = () => {
    const submissionData = prepareSubmissionData();
    console.log("Submitting:", submissionData);
    // TODO api calls to submit answers
  };

  if (!status || status.questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = status.questions[activeIndex];

  return (
    <div className="border p-4">
      <h2>{currentQuestion.question}</h2>
      <RadioGroup
        value={answers[currentQuestion.id] || ""}
        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
      >
        {["Yes", "No"].map((answer) => (
          <div key={answer} className="flex items-center space-x-2">
            <RadioGroupItem value={answer} id={`q${currentQuestion.id}-${answer}`} />
            <Label htmlFor={`q${currentQuestion.id}-${answer}`}>{answer}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex space-x-2 mt-4">
        {activeIndex > 0 && <Button onClick={() => setActiveIndex((prev) => prev - 1)}>Previous</Button>}
        {activeIndex < status.questions.length - 1 ? (
          <Button onClick={() => setActiveIndex((prev) => prev + 1)}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-500 text-white">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
