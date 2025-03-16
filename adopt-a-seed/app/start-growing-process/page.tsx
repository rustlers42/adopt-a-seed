"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TreesIcon as Plant, SproutIcon } from "lucide-react";

import { Combobox, type ComboxOption } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { SeedDatabaseDTO } from "@/lib/seed-database";
import type { SeedDTO } from "@/lib/seed";
import { useFetchApi } from "@/lib/use-api";
import { useAuth } from "@/lib/auth-context";
import { postData } from "@/lib/api-helpers";
import ProtectedRoute from "@/components/protected-route";

export default function StartGrowingProcessPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch seed databases and seeds
  const { data: seedDatabases, isLoading: loadingSeedDatabases } = useFetchApi<SeedDatabaseDTO[]>(
    "http://localhost:8000/seed_databases",
    { requireAuth: true },
  );

  const { data: seeds, isLoading: loadingSeeds } = useFetchApi<SeedDTO[]>("http://localhost:8000/seeds", {
    requireAuth: true,
  });

  // State for form values
  const [selectedSeed, setSelectedSeed] = useState<ComboxOption | null>(null);
  const [selectedSeedDatabase, setSelectedSeedDatabase] = useState<ComboxOption | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());

  // Convert seeds to combobox options
  const seedOptions =
    seeds?.map((seed) => ({
      value: seed.id.toString(),
      label: `${seed.category} (${seed.specific_name})`,
    })) || [];

  // Convert seed databases to combobox options
  const seedDatabaseOptions =
    seedDatabases?.map((db) => ({
      value: db.id.toString(),
      label: db.name,
    })) || [];

  // Handle form submission
  const handleStartGrowing = async () => {
    // Reset states
    setError(null);
    setSuccess(null);

    // Validate form
    if (!selectedSeed) {
      setError("Please select a seed");
      return;
    }

    if (!selectedSeedDatabase) {
      setError("Please select a seed database");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get auth token
      const token = getToken();

      // Prepare request data
      const requestData = {
        seed_id: selectedSeed.value,
        seed_database_id: selectedSeedDatabase.value,
        planted_at: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      // Make POST request using our helper
      const result = await postData("http://localhost:8000/plants", requestData, token || undefined);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Growing process started successfully!");
        // Optionally redirect after success
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to start growing process. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SproutIcon className="h-6 w-6 text-green-600" />
              Start Growing Process
            </CardTitle>
            <CardDescription>Select a seed and database to begin your growing journey</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="seed">Seed</Label>
              <Combobox
                options={seedOptions}
                onSelect={setSelectedSeed}
                placeholder={loadingSeeds ? "Loading seeds..." : "Select a seed"}
                emptyMessage="No seeds found"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seedDatabase">Seed Database</Label>
              <Combobox
                options={seedDatabaseOptions}
                onSelect={setSelectedSeedDatabase}
                placeholder={loadingSeedDatabases ? "Loading databases..." : "Select a seed database"}
                emptyMessage="No seed databases found"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker initialDate={startDate} onDateChange={setStartDate} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              variant="default"
              onClick={handleStartGrowing}
              disabled={isSubmitting || !selectedSeed || !selectedSeedDatabase}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <SproutIcon className="mr-2 h-4 w-4" />
                  Start Growing
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
