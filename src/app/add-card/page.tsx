"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cardBrandList, formSchema } from "./constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { saveCard } from "@/helpers/firebase/database";

type TFormType = z.infer<typeof formSchema>;

const AddCard = () => {
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: TFormType) => {
    saveCard(values);
  };

  return (
    <div className="mt-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add new card
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="cardBrand"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Card brand</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[17rem]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardBrandList.map((cardBrand) => (
                        <SelectItem key={cardBrand.id} value={cardBrand.id}>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={`/${cardBrand.id}.png`} />
                            </Avatar>
                            <span>{cardBrand.name}</span>
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
            name="cardName"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Card name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    className="w-[17rem]"
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
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Last 4 digits</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    className="w-[17rem]"
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
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Card billing date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter card name"
                    autoComplete="off"
                    className="w-[17rem]"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCard;
