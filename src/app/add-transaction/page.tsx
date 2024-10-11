"use client";

import CardName from "@/components/common/card-name";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc-client/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CalendarIcon, IndianRupeeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getCardBrand } from "../add-card/constants";
import { formSchema } from "./constants";

dayjs.extend(advancedFormat);

type TFormType = z.infer<typeof formSchema>;

const AddTransaction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardId: searchParams.get("cardId") || undefined,
      date: new Date(),
    },
  });

  const { data: cardData } = trpc.card.getAll.useQuery();
  const trpcUtils = trpc.useUtils();
  const {
    mutateAsync: saveCardTransaction,
    isSuccess,
    isLoading,
  } = trpc.transaction.add.useMutation({
    onSuccess: () => {
      trpcUtils.transaction.invalidate();
    },
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
    }
  }, [isLoading, isSuccess, router]);

  const onSubmit = (values: TFormType) => {
    const { date, ...rest } = values;
    saveCardTransaction({ ...rest, date: date.getTime() })
      .then(() => {
        toast("Transaction added successfully");
        router.push("/");
      })
      .catch((error) => {
        if (error.name === "TRPCClientError") {
          toast(error.message);
        }
      });
  };

  const cardOptions = useMemo(() => {
    if (!cardData) {
      return [];
    }
    return Object.entries(cardData).map(([cardId, card]) => ({
      id: cardId,
      name: card.cardName,
      cardBrand: getCardBrand(card.cardBrand),
    }));
  }, [cardData]);

  return (
    <div className="mt-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Record new transaction
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-4 w-[17rem]"
        >
          <FormField
            control={form.control}
            name="cardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card</FormLabel>
                <FormControl>
                  <Select
                    disabled={!cardOptions.length}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardOptions.map((cardOptions) => (
                        <SelectItem key={cardOptions.id} value={cardOptions.id}>
                          <CardName
                            cardBrandId={cardOptions.cardBrand?.id}
                            cardName={cardOptions.name}
                            className="gap-4"
                          />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter amount"
                      autoComplete="off"
                      type="number"
                      {...field}
                      className="pl-6"
                    />
                    <IndianRupeeIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-[13px] w-[13px] opacity-50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Bill paid on</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("Do MMMM YYYY")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2024-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTransaction;
