'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { signInWithGoogle, signOutUser } from '@/helpers/firebase/auth';
import dynamic from 'next/dynamic';
import { useUser } from '@/app/contexts/user-context';

const CardsLogo = dynamic(() => import('@/components/icons/cards-logo'), {
  ssr: false,
});

const NavBar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="pb-8">
      <nav className="flex justify-between items-center h-16 shadow-sm px-4 border-b">
        <Link href="/">
          <CardsLogo className="w-[5.6rem]" />
        </Link>
        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.photoURL ?? ''} />
                <AvatarFallback>
                  <UserRound />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              {user ? (
                <>
                  <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push('/add-transaction')}
                  >
                    Record a transaction
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/saved-cards')}>
                    Saved cards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/add-card')}>
                    Add card
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOutUser}>
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={signInWithGoogle}>
                  Log in
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
