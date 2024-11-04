import { Avatar, AvatarImage } from '@/components/ui/avatar';
import clsx from 'clsx';

interface Props {
  cardBrandId: string | undefined;
  cardName: string;
  className?: string;
}

const CardName = ({ cardBrandId, cardName, className }: Props) => (
  <div className={clsx('flex items-center gap-2', className)}>
    <Avatar className="h-5 w-5">
      <AvatarImage src={`/brands/${cardBrandId}.png`} />
    </Avatar>
    <span className="accent">{cardName}</span>
  </div>
);

export default CardName;
