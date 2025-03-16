import { useFetchApi } from "@/lib/use-api";
import { LightbulbIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";

interface PlantPageProps {
  id: string;
}

type HelpResponseDTO = {
  text: string;
};

export default function HelpAlert({ id }: PlantPageProps) {
  const { data: help, isLoading } = useFetchApi<HelpResponseDTO>(`http://localhost:8000/plants/${id}/help`, {
    requireAuth: true,
    enabled: true,
  });

  if (isLoading) {
    return (
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-amber-600" />
            Growing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!help) return null;

  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-amber-600" />
          Growing Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none prose-headings:text-amber-900 prose-headings:font-medium prose-p:text-amber-950">
          <ReactMarkdown>{help.text}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
