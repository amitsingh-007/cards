"use client";

import CardName from "@/components/common/card-name";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  getCards,
  getCardTransactionsInfinite,
} from "@/helpers/firebase/database";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useUser } from "./contexts/user-context";
import { getFormattedPrice, getMergedTxnData } from "./utils";
import { ReloadIcon } from "@radix-ui/react-icons";

const DashboardHistory = () => {
  const { user } = useUser();

  const { data: cardsData } = useQuery({
    queryKey: ["saved-cards"],
    queryFn: getCards,
    enabled: !!user,
  });
  const {
    data: allTransactionsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["all-transactions"],
    queryFn: getCardTransactionsInfinite,
    initialPageParam: Date.now(),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const transactions = Object.values(lastPage);
      return transactions[transactions.length - 1].date;
    },
  });

  const recentTransactionsData = useMemo(
    () => getMergedTxnData(cardsData, allTransactionsData),
    [cardsData, allTransactionsData]
  );

  return (
    <div className="flex flex-col gap-4 w-full sm:w-[600px] mx-auto">
      {recentTransactionsData.map(
        ({ cardDetails, transaction, transactionId }) => (
          <Card key={transactionId}>
            <CardHeader className="flex flex-row justify-between p-4">
              <CardName
                cardBrandId={cardDetails.cardBrand}
                cardName={cardDetails.cardName}
              />
              <span>{getFormattedPrice(transaction?.amount)}</span>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              {dayjs(transaction.date).format("DD MMM YYYY")}
            </CardFooter>
          </Card>
        )
      )}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="mx-auto"
        >
          {isFetching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Load more
        </Button>
      )}
    </div>
  );
};

export default DashboardHistory;
