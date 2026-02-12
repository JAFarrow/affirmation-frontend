import { Mood } from '../types';

export const validateUsername = (username: string): string | null => {
  const trimmed = username.trim();
  
  if (!trimmed) {
    return 'Username is required';
  }
  
  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters';
  }
  
  if (trimmed.length > 18) {
    return 'Username must be no more than 18 characters';
  }
  
  return null;
};

export const validateMood = (mood: Mood | ''): string | null => {
  if (!mood) {
    return 'Please select a mood';
  }
  
  const validMoods = Object.values(Mood);
  if (!validMoods.includes(mood as Mood)) {
    return 'Please select a valid mood';
  }
  
  return null;
};

export const validateDetails = (details: string): string | null => {
  if (details.length > 80) {
    return 'Details must be no more than 80 characters';
  }
  
  return null;
};
