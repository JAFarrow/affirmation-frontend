import { AffirmationRequest, AffirmationResponse, ApiErrorCode } from '../types';

const API_BASE_URL = 'http://localhost:5000';

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: ApiErrorCode | number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchAffirmation = async (
  request: AffirmationRequest
): Promise<AffirmationResponse> => {
  try {
    const formData = new FormData();
    formData.append('username', request.username);
    formData.append('mood', request.mood);
    if (request.details) {
      formData.append('details', request.details);
    }

    const response = await fetch(`${API_BASE_URL}/api/affirmations`, {
      method: 'POST',
      body: formData,
    });

    switch (response.status) {
      case 200: {
        const data: AffirmationResponse = await response.json();
        return data;
      }

      case 400: {
        const errorData: AffirmationResponse = await response.json();
        const errorMessage = errorData.errors 
          ? Object.values(errorData.errors).join(', ')
          : 'Invalid request. Please check your input.';
        throw new ApiError(errorMessage, 400);
      }

      case 500: {
        throw new ApiError(
          'Something went wrong on our end. Please try again later.',
          500
        );
      }

      case 503: {
        throw new ApiError(
          'Our service is temporarily unavailable. Please try again in a few moments.',
          503
        );
      }

      case 504: {
        throw new ApiError(
          'TOur service is temporarily unavailable. Please try again in a few moments.',
          504
        );
      }

      default: {
        throw new ApiError(
          `An unexpected error occurred (Status: ${response.status}). Please try again.`,
          response.status
        );
      }
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Unable to connect to the server. Please check your internet connection.',
        0
      );
    }

    throw new ApiError(
      'An unexpected error occurred. Please try again.',
      0
    );
  }
};

export { ApiError };
