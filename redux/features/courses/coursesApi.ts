import { apiSlice } from '../api/apiSlice';

type RegistrationData = {};

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),

    getAllCoursesAdmin: builder.query({
      query: () => ({
        url: 'get-all-courses-admin',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),

    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: `get-all-courses`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-single-course/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    addQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: 'add-question',
        method: 'PUT',
        body: { question, courseId, contentId },
        credentials: 'include' as const,
      }),
    }),

    addAnswer: builder.mutation({
      query: ({ answer, questionId, courseId, contentId }) => ({
        url: 'add-answer',
        method: 'PUT',
        body: { answer, questionId, courseId, contentId },
        credentials: 'include' as const,
      }),
    }),

    addReview: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        method: 'PUT',
        body: { review, rating, courseId },
        credentials: 'include' as const,
      }),
    }),

    addReplyToReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-reply-review`,
        method: 'PUT',
        body: { comment, courseId, reviewId },
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesAdminQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewMutation,
  useAddReplyToReviewMutation,
} = courseApi;
