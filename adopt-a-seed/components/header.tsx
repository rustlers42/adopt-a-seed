import Link from "next/link";
import { SproutIcon as Seedling } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
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
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <span className="font-medium">100</span>
          <Seedling className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
