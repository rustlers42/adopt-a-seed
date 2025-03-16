"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchApi } from "@/lib/use-api";

type UserScore = {
  username: string;
  score: number;
};

export default function Leaderboard() {
  const { data: userProfile, isLoading } = useFetchApi<UserScore[]>("http://localhost:8000/users/scores", {
    requireAuth: false,
    enabled: true,
  });

  return (
    <div className={"container mx-auto py-8"}>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Skeleton className="w-60 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-60 h-4" />
              </TableCell>
            </TableRow>
          ) : (
            userProfile?.map((user) => (
              <TableRow key={user.username}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.score}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
