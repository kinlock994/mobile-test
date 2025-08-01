import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export type Product = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Meta = {
  total_count: number;
  total_pages: number;
  current_page: number;
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQuery,
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<
      { products: Product[]; meta: Meta },
      { page?: number; per_page?: number }
    >({
      query: ({ page = 1, per_page = 10 }) =>
        `/products?page=${page}&per_page=${per_page}`,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, string>({
      query: id => `/products/by-id/${id}`,
      providesTags: (_, __, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<
      Product,
      { title: string; description?: string; image?: string }
    >({
      query: body => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string } & Partial<Pick<Product, 'title' | 'description' | 'image'>>
    >({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Product', id }, 'Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
