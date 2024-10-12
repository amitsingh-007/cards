import { GitHubLogoIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CardsLogo = dynamic(() => import('@/components/icons/cards-logo'), {
  ssr: false,
});

const Footer = () => {
  return (
    <footer className="flex justify-between py-4 px-10 border-t">
      <div className="flex gap-4 items-center">
        <CardsLogo className="h-auto w-16" />
        <span className="text-sm text-muted-foreground">© 2024 Cards</span>
      </div>
      <Link
        href="https://github.com/amitsingh-007/cards"
        target="_blank"
        className="opacity-60 hover:opacity-100"
      >
        <GitHubLogoIcon className="h-7 w-7" />
      </Link>
    </footer>
  );
};

export default Footer;
