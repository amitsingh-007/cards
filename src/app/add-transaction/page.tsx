"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { getCards, saveCardTransaction } from "@/helpers/firebase/database";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { CalendarIcon, IndianRupeeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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
  const queryClient = useQueryClient();

  const { data: cardData } = useQuery({
    queryKey: ["saved-cards"],
    queryFn: getCards,
  });
  const {
    mutate: mutateCardTransaction,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: saveCardTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-transactions"] });
    },
  });

  useEffect(() => {
    if (isSuccess && !isPending) {
      router.push("/");
    }
  }, [isPending, isSuccess, router]);

  const onSubmit = (values: TFormType) => {
    mutateCardTransaction(values);
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
                          <div className="flex items-center gap-4">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={`/brands/${cardOptions.cardBrand?.id}.png`}
                              />
                            </Avatar>
                            <span>{cardOptions.name}</span>
                          </div>
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
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTransaction;
