import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productDetails) => {
        return {
          url: "/product",
          method: "POST",
          body: productDetails,
        };
      },
    }),
    payment: builder.mutation({
      query: (body) => {
        return {
          url: "/order/payment",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});
export const { useCreateProductMutation, usePaymentMutation } = productApi;
