import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const ordinalBillingDate = (billingDate: number) => {
  const date = new Date(1990, 1, billingDate); // Dummy year and month
  return dayjs(date).format("Do");
};
