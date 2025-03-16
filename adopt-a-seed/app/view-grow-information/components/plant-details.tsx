import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlantDTO } from "@/lib/plant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SproutIcon, CalendarIcon, TagIcon, InfoIcon, ActivityIcon } from "lucide-react";

export default function PlantDetails({ plant }: { plant: PlantDTO | null }) {
  if (!plant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "germinating":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "seedling":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "growing":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "flowering":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "fruiting":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "harvested":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "dead":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <SproutIcon className="h-5 w-5 text-green-600" />
          Plant Details
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TagIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Plant ID</p>
                <p className="font-medium">{plant.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{plant.seed_category}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SproutIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Specific Name</p>
                <p className="font-medium">{plant.seed_specific}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Planted Date</p>
                <p className="font-medium">
                  {plant.planted_at ? format(new Date(plant.planted_at), "PPP") : "Not planted yet"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ActivityIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <Badge className={`mt-1 ${getStatusColor(plant.current_status)}`}>{plant.current_status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
