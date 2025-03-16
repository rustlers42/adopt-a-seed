"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { postData } from "@/lib/api-helpers";
import { useAuth } from "@/lib/auth-context";
import type { PlantDTO } from "@/lib/plant";
import { useFetchApi } from "@/lib/use-api";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Frown,
  Laugh,
  Loader2Icon,
  Meh,
  TreesIcon as Plant,
  Skull,
  Smile,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  otp_question: Question | null;
  current_status: string;
  next_status: string;
};

export default function PlantSurvey({ id }: PlantPageProps) {
  const router = useRouter();

  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [otpValue, setOtpValue] = useState("");

  const { data: status, isLoading } = useFetchApi<PlantStatusDTO>(`http://localhost:8000/plants/${id}/status`, {
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
      otp_question: status.otp_question
        ? {
            ...status.otp_question,
            answer: otpValue,
          }
        : null,
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
        setSuccess("Status updated successfully!");

        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Plant Status Survey</CardTitle>
          <CardDescription>Loading survey questions...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!status || status?.questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Plant Status Survey</CardTitle>
          <CardDescription>No survey questions available at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            There are no status questions for this plant at its current growth stage. Check back later as your plant
            continues to grow.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 flex justify-center items-center z-10 bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2Icon className="h-6 w-6 animate-spin text-green-600" />
            <span>Updating plant status...</span>
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plant className="h-5 w-5 text-green-600" />
          Plant Status Survey
        </CardTitle>
        <CardDescription>Help us track your plant&apos;s progress by answering these questions</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {!success && (
          <>
            {status.questions.map((question, index) => (
              <div key={question.id} className="space-y-3">
                {index > 0 && <Separator />}
                <Label className="text-base font-medium">{question.question}</Label>
                <div className="flex justify-between items-center mt-2 bg-slate-50 p-3 rounded-md">
                  {["1", "2", "3", "4", "5"].map((value) => {
                    const Icon = getIconForValue(value);
                    const isSelected = answers[question.id] === value;
                    return (
                      <div
                        key={value}
                        className={`flex flex-col items-center gap-1 cursor-pointer transition-all p-2 rounded-md
                          ${isSelected ? "bg-green-100 text-green-700 scale-110 shadow-sm" : "hover:bg-slate-100"}`}
                        onClick={() => handleAnswerChange(question.id, value)}
                      >
                        <Icon className={`h-8 w-8 ${getIconColor(value)}`} />
                        <span className="text-xs font-medium">{getRatingLabel(value)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {status.otp_question && (
              <div className="space-y-3 pt-2">
                <Separator />
                <Label className="text-base font-medium">{status.otp_question.question}</Label>
                <div className="flex justify-center my-4">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    className="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-green-200" />
                      <InputOTPSlot index={1} className="border-green-200" />
                      <InputOTPSlot index={2} className="border-green-200" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="border-green-200" />
                      <InputOTPSlot index={4} className="border-green-200" />
                      <InputOTPSlot index={5} className="border-green-200" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      {!success && (
        <CardFooter className="flex justify-end border-t pt-4 bg-slate-50">
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2Icon className="mr-2 h-4 w-4" />
                Submit Survey
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
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

// Helper function to get color for each icon
const getIconColor = (value: string) => {
  switch (value) {
    case "1":
      return "text-green-600";
    case "2":
      return "text-emerald-500";
    case "3":
      return "text-amber-500";
    case "4":
      return "text-orange-500";
    case "5":
      return "text-red-500";
    default:
      return "text-slate-500";
  }
};

// Helper function to get label for each rating
const getRatingLabel = (value: string) => {
  switch (value) {
    case "1":
      return "Excellent";
    case "2":
      return "Good";
    case "3":
      return "Average";
    case "4":
      return "Poor";
    case "5":
      return "Critical";
    default:
      return "";
  }
};
