export enum Mood {
  HAPPY = 'Happy',
  SAD = 'Sad',
  EXCITED = 'Excited',
  STRESSED = 'Stressed',
  NEUTRAL = 'Neutral',
}

export interface AffirmationRequest {
  username: string;
  mood: Mood;
  details?: string;
}

export interface AffirmationResponse {
  data?: {
    affirmation: string;
  };
  errors?: Record<string, string>;
}

export type ApiErrorCode = 400 | 500 | 503 | 504;

export interface AffirmationFormProps {
  onSubmit: (data: AffirmationRequest) => void;
  isLoading: boolean;
}

export interface OutputBoxProps {
  content: string | null;
  isError: boolean;
  isLoading: boolean;
}

export interface UseAffirmationReturn {
  affirmation: string | null;
  error: string | null;
  isLoading: boolean;
  submitRequest: (data: AffirmationRequest) => Promise<void>;
}

export interface ValidationErrors {
  username?: string;
  mood?: string;
  details?: string;
}
