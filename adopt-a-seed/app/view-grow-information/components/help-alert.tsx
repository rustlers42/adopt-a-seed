import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFetchApi } from "@/lib/use-api";
import { TreesIcon as Plant } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

interface PlantPageProps {
  id: string;
}

type HelpResponseDTO = {
  text: string;
};

export default function HelpAlert({ id }: PlantPageProps) {
  const { data: help } = useFetchApi<HelpResponseDTO>(`http://localhost:8000/plants/${id}/help`, {
    requireAuth: true,
    enabled: true,
  });

  return (
    <>
      {help && (
        <Alert className="bg-green-50 border-green-200">
          <Plant className="h-4 w-4 text-green-600" />
          <AlertTitle>Help</AlertTitle>
          <AlertDescription>
            <ReactMarkdown>{help.text}</ReactMarkdown>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
