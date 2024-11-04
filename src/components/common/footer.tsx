import { GitHubLogoIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CardsLogo = dynamic(() => import('@/components/icons/cards-logo'), {
  ssr: false,
});

const Footer = () => {
  return (
    <footer className="flex justify-between mt-2 py-4 px-6 sm:px-10 border-t">
      <div className="flex gap-2 sm:gap-4 items-center">
        <CardsLogo className="h-auto w-16" />
        <span className="text-xs sm:text-sm text-muted-foreground">
          © 2024 Cards
        </span>
      </div>
      <Link
        href="https://github.com/amitsingh-007/cards"
        target="_blank"
        className="sm:opacity-60 hover:opacity-100"
        title="Cards GitHub"
      >
        <GitHubLogoIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </Link>
    </footer>
  );
};

export default Footer;
