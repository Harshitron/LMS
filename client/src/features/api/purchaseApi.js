import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend API base URL for course purchases
const COURSE_PURCHASE_API = `https://backend-lms-cqp9.onrender.com/api/v1/purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include", // Include credentials for handling authentication (e.g., cookies)
  }),
  endpoints: (builder) => ({
    // Create a checkout session for purchasing a course
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId }, // Sending courseId to initiate the checkout
      }),
      // Optionally, add cache invalidation or tagging here if required
    }),

    // Get detailed course information along with purchase status
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
      // Consider caching the course details to avoid unnecessary re-fetching
    }),

    // Get list of courses purchased by the user
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      // You might want to provide tags here for cache management
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
