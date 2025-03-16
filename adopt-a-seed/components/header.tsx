"use client";

import Link from "next/link";
import { LogOut, SproutIcon as Seedling, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useFetchApi } from "@/lib/use-api";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfile = {
  email: string;
  username: string;
  score: number;
};

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  // Only fetch user profile when authenticated
  const { data: userProfile, isLoading } = useFetchApi<UserProfile>("http://localhost:8000/users/me", {
    requireAuth: true,
    // Skip the API call if not authenticated
    enabled: isAuthenticated,
  });

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Seedling className="h-6 w-6" />
          <h1 className="text-2xl font-bold">adopt-a-seed</h1>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/view-seed-database" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Seed Databases</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/view-leaderboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Leaderboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isAuthenticated &&
              (isLoading ? (
                <Skeleton className="h-6 w-12" />
              ) : (
                <span className="font-medium">{userProfile?.score || 0}</span>
              ))}
            {isAuthenticated && <Seedling className="h-5 w-5" aria-hidden="true" />}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link href="/profile" className="flex items-center gap-1 text-sm">
                <User className="h-4 w-4" />
                <span>{user?.username}</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
