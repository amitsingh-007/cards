"use client";

import CardsLogo from "@/components/icons/cards-logo";
import { useUser } from "./contexts/user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center h-16 shadow-sm px-4">
      <CardsLogo className="scale-[0.4] origin-left" />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.photoURL ?? ""} />
              <AvatarFallback>
                <UserRound />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/saved-cards")}>
              Saved cards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/add-card")}>
              Add card
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
