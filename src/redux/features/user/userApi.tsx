import { baseApi } from "@/redux/api/baseApi";

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
    getUser: builder.query({
      query: ({ searchTerm, page, limit, sortBy, sortOrder, fields }) => {
        let queryString = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        if (searchTerm) {
          queryString += `&search=${searchTerm}`;
        }
        if (fields && fields.length > 0) {
          queryString += `&fields=${fields.join(",")}`;
        }
        return `user${queryString}`;
      },
    }),

    block: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/users/${id}/block`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const { useCreateProductMutation, useBlockMutation, useGetUserQuery } =
  productApi;
