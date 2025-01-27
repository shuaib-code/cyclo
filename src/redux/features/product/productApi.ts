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
  }),
});
export const { useCreateProductMutation } = productApi;
