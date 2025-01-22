import { Avatar, AvatarImage } from '@/components/ui/avatar';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  cardBrandId: string | undefined;
  cardName: ReactNode;
  className?: string;
}

const CardName = ({ cardBrandId, cardName, className }: Props) => (
  <div className={clsx('flex items-center gap-2', className)}>
    <Avatar className="h-5 w-5">
      <AvatarImage src={`/brands/${cardBrandId}.png`} className="bg-white" />
    </Avatar>
    <span className="accent">{cardName}</span>
  </div>
);

export default CardName;
