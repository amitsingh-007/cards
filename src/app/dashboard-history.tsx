"use client";

import CardName from "@/components/common/card-name";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { trpc } from "@/trpc-client/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useMemo } from "react";
import { getFormattedPrice, getMergedTxnData } from "./utils";

const DashboardHistory = () => {
  const { data: cardsData } = trpc.card.getAll.useQuery();
  const {
    data: allTransactionsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = trpc.transaction.getByPagination.useInfiniteQuery(
    {},
    {
      initialCursor: Date.now(),
      getNextPageParam: (lastPage) => {
        if (!lastPage) return undefined;
        const transactions = Object.values(lastPage).sort(
          (a, b) => b.date - a.date
        );
        return transactions.at(-1)?.date;
      },
    }
  );

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
