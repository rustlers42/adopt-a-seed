"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useFetchApi } from "@/lib/use-api";
import { useAuth } from "@/lib/auth-context";
import { postData } from "@/lib/api-helpers";
import { PlantDTO } from "@/lib/plant";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TreesIcon as Plant, Smile, Meh, Frown, Laugh, Skull } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data: status } = useFetchApi<PlantStatusDTO>(`http://localhost:8000/plants/${id}/status`, {
    requireAuth: true,
    enabled: true,
  });

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (status) {
      setAnswers(extractAnswers(status));
    }
  }, [status]);

  const extractAnswers = (status: PlantStatusDTO): { [key: number]: string } => {
    return status.questions.reduce(
      (acc, q) => {
        if (q.answer) acc[q.id] = q.answer;
        return acc;
      },
      {} as { [key: number]: string },
    );
  };

  const handleAnswerChange = (questionId: number, value: string): void => {
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

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setSuccess(null);

    const submissionData = prepareSubmissionData();

    setIsSubmitting(true);

    try {
      const token = getToken();

      const result = await postData<PlantDTO>(
        `http://localhost:8000/plants/${id}/status`,
        submissionData,
        token || undefined,
      );

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Successfully submitted!");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!status || status.questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="border p-4 relative">
      {isSubmitting && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black/30">
          <Spinner /> {/* Spinner component */}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <Plant className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {status.questions.map((question) => (
        <div key={question.id} className="mb-4">
          <h2>{question.question}</h2>
          <div className="flex space-x-4">
            {["1", "2", "3", "4", "5"].map((value) => {
              const Icon = getIconForValue(value); // Get corresponding icon for value
              return (
                <div
                  key={value}
                  className={`cursor-pointer ${answers[question.id] === value ? "text-blue-600" : ""}`}
                  onClick={() => handleAnswerChange(question.id, value)}
                >
                  <Icon className="h-8 w-8" />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex space-x-2 mt-4">
        <Button onClick={handleSubmit} className="bg-green-500 text-white" disabled={isSubmitting}>
          Submit
        </Button>
      </div>
    </div>
  );
}

// Helper function to return the corresponding icon for each value
const getIconForValue = (value: string) => {
  switch (value) {
    case "1":
      return Laugh; // Very Happy
    case "2":
      return Smile; // Happy
    case "3":
      return Meh; // Neutral
    case "4":
      return Frown; // Meh (Unhappy)
    case "5":
      return Skull; // Unhappy (Worst)
    default:
      return Smile;
  }
};
