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
    getOrders: builder.query({
      query: ({ searchTerm, page, limit, sortBy, sortOrder, fields }) => {
        // Construct the query parameters dynamically
        let queryString = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

        // Add the search term if provided
        if (searchTerm) {
          queryString += `&search=${searchTerm}`;
        }

        // Add the fields if provided
        if (fields && fields.length > 0) {
          queryString += `&fields=${fields.join(",")}`;
        }

        return `order${queryString}`;
      },
    }),
    status: builder.mutation({
      query: (body) => {
        return {
          url: `/order/${body.id}`,
          method: "PATCH",
          body: { status: body.status },
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
export const {
  useCreateProductMutation,
  usePaymentMutation,
  useGetOrdersQuery,
  useStatusMutation,
} = productApi;
