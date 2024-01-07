"use client";

import { useGetProductByIdQuery } from "@/redux/product/productSlice";
import { useParams } from "next/navigation";

export default function Product() {
  const params = useParams();
  console.log(params);

  const {
    data: productByIdData,
    error: productByIdError,
    isLoading: productByIdLoading,
  } = useGetProductByIdQuery(params.productId);

  return <main>Main</main>;
}
