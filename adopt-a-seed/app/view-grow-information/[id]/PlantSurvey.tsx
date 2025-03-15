"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

class PlantHealthQuestion {
  constructor(
    public question: string,
    public answers: string[],
  ) {}
}

export default function PlantSurvey() {
  const questions = [
    new PlantHealthQuestion("How does the soil feel when touched?", ["Very Wet", "Wet", "Moist", "Dry"]),
    new PlantHealthQuestion("Has the plant sprouted yet?", ["Yes", "No"]),
    // Add more questions as needed
  ];

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handleNext = () => setActiveQuestionIndex((prev) => prev + 1);
  const handlePrev = () => setActiveQuestionIndex((prev) => prev - 1);

  return (
    <div className="border">
      <h2>{questions[activeQuestionIndex].question}</h2>
      <RadioGroup defaultValue={questions[activeQuestionIndex].answers[0]}>
        {questions[activeQuestionIndex].answers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={answer} id={`r${index}`} />
            <Label htmlFor={`r${index}`}>{answer}</Label>
          </div>
        ))}
      </RadioGroup>
      {activeQuestionIndex > 0 && <Button onClick={handlePrev}>Previous</Button>}
      {activeQuestionIndex < questions.length - 1 && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
}
