import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const ordinalBillingDate = (billingDate: number) => {
  const date = new Date(1990, 0, billingDate); // Dummy year and month
  return dayjs(date).format('Do');
};

interface Props {
  billingDate: number;
  ordinalClassName?: string;
}

const BillingDate = ({ billingDate, ordinalClassName }: Props) => (
  <div className="flex gap-1 items-baseline">
    <p className={ordinalClassName}>{ordinalBillingDate(billingDate)}</p>
    <p className="text-xs hidden sm:block">of every month</p>
  </div>
);

export default BillingDate;
