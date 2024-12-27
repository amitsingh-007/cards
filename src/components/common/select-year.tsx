import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  isDisabled: boolean;
}

const currentYear = new Date().getFullYear();
const startingYear = 2024;
export const YEARS = Array.from(
  { length: currentYear - startingYear + 1 },
  (_, i) => currentYear - i
);

const SelectYear = ({ selectedYear, setSelectedYear, isDisabled }: Props) => {
  return (
    <Select
      value={selectedYear.toString()}
      onValueChange={(newYear) => setSelectedYear(Number(newYear))}
      disabled={isDisabled}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {YEARS.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectYear;
