"use client";

import CardName from "@/components/common/card-name";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveCard } from "@/helpers/firebase/database";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cardBrandList, formSchema } from "./constants";

type TFormType = z.infer<typeof formSchema>;

const AddCard = () => {
  const router = useRouter();
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
  });
  const queryClient = useQueryClient();

  const {
    mutate: mutateCard,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: saveCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-cards"] });
    },
  });

  useEffect(() => {
    if (isSuccess && !isPending) {
      router.push("/saved-cards");
    }
  }, [isPending, isSuccess, router]);

  const onSubmit = (values: TFormType) => {
    mutateCard(values);
  };

  return (
    <div className="mt-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add new card
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-4 w-[17rem]"
        >
          <FormField
            control={form.control}
            name="cardBrand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card brand</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardBrandList.map((cardBrand) => (
                        <SelectItem key={cardBrand.id} value={cardBrand.id}>
                          <CardName
                            cardBrandId={cardBrand.id}
                            cardName={cardBrand.name}
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
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardLastDigits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last 4 digits</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cardBillingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card billing date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    type="number"
                    {...field}
                  />
                </FormControl>
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

export default AddCard;
