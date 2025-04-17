import { useQuery } from "@tanstack/react-query";
import { getFaqList } from "@/lib/api/faq";

export const useFaqQuery = (category?: string, keyword?: string) => {
  return useQuery({
    queryKey: ["faq", category, keyword],
    queryFn: () => getFaqList(category, keyword),
  });
};
