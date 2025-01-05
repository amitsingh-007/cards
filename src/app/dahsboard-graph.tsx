import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { trpc } from '@/trpc-client/api';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SelectYear from '@/components/common/select-year';

const chartConfig: ChartConfig = {
  month: {
    label: 'Month',
    color: 'hsl(var(--chart-1))',
  },
};

const now = new Date();
const currentYear = now.getFullYear();

const DashboardGraph = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: annualSummary = [] } =
    trpc.transaction.getAnnualSummary.useQuery({ year: selectedYear });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Annual summary</CardTitle>
          <CardDescription>
            Showing {selectedYear} monthly summary
          </CardDescription>
        </div>
        <SelectYear
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[460px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={annualSummary}
            margin={{ top: 24 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <Bar
              dataKey="sum"
              fill="var(--color-month)"
              radius={8}
              activeIndex={
                selectedYear === currentYear ? now.getMonth() : undefined
              }
              strokeWidth={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke="var(--color-month)"
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                formatter={(sum: number) => Number.parseInt(sum.toString())}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardGraph;
