import React, { useState, useCallback } from 'react';
import { AffirmationFormProps, Mood, AffirmationRequest, ValidationErrors } from '../../types';
import { validateUsername, validateMood, validateDetails } from '../../utils/validation';

const AffirmationForm: React.FC<AffirmationFormProps> = ({ onSubmit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [mood, setMood] = useState<Mood | ''>('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const moodOptions: { value: Mood; label: string }[] = [
    { value: Mood.HAPPY, label: 'Happy' },
    { value: Mood.SAD, label: 'Sad' },
    { value: Mood.EXCITED, label: 'Excited' },
    { value: Mood.STRESSED, label: 'Stressed' },
    { value: Mood.NEUTRAL, label: 'Neutral' },
  ];

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const moodError = validateMood(mood);
    if (moodError) newErrors.mood = moodError;

    const detailsError = validateDetails(details);
    if (detailsError) newErrors.details = detailsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, mood, details]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error: string | null = null;
    switch (field) {
      case 'username':
        error = validateUsername(username);
        break;
      case 'mood':
        error = validateMood(mood);
        break;
      case 'details':
        error = validateDetails(details);
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: error || undefined
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ username: true, mood: true, details: true });
    
    if (validateForm()) {
      const requestData: AffirmationRequest = {
        username: username.trim(),
        mood: mood as Mood,
      };
      
      const trimmedDetails = details.trim();
      if (trimmedDetails) {
        (requestData as AffirmationRequest & { details: string }).details = trimmedDetails;
      }
      
      onSubmit(requestData);
    }
  };

  const detailsLength = details.length;
  const isDetailsWarning = detailsLength > 60;

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
          <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="username"
          type="text"
          className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => handleBlur('username')}
          placeholder="Enter your username"
          aria-required="true"
          aria-invalid={!!errors.username && touched.username}
          aria-describedby={errors.username && touched.username ? 'username-error' : undefined}
          disabled={isLoading}
          minLength={3}
          maxLength={18}
          autoComplete="username"
        />
        {errors.username && touched.username && (
          <span id="username-error" className="error-message" role="alert">
            {errors.username}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="mood" className="form-label">
          How are you feeling?
          <span className="required" aria-hidden="true">*</span>
        </label>
        <select
          id="mood"
          className={`form-select ${errors.mood && touched.mood ? 'error' : ''}`}
          value={mood}
          onChange={(e) => setMood(e.target.value as Mood | '')}
          onBlur={() => handleBlur('mood')}
          aria-required="true"
          aria-invalid={!!errors.mood && touched.mood}
          aria-describedby={errors.mood && touched.mood ? 'mood-error' : undefined}
          disabled={isLoading}
        >
          <option value="" disabled>Select a mood...</option>
          {moodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.mood && touched.mood && (
          <span id="mood-error" className="error-message" role="alert">
            {errors.mood}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="details" className="form-label">
          Additional Details
          <span className="optional"> (optional)</span>
        </label>
        <textarea
          id="details"
          className={`form-textarea ${errors.details && touched.details ? 'error' : ''}`}
          value={details}
          onChange={(e) => {
            if (e.target.value.length <= 80) {
              setDetails(e.target.value);
            }
          }}
          onBlur={() => handleBlur('details')}
          placeholder="Add any details (optional)..."
          rows={3}
          maxLength={80}
          aria-describedby="details-counter"
          disabled={isLoading}
        />
        <div 
          id="details-counter" 
          className={`character-counter ${isDetailsWarning ? 'warning' : ''}`}
          aria-live="polite"
        >
          {detailsLength}/80 characters
        </div>
        {errors.details && touched.details && (
          <span id="details-error" className="error-message" role="alert">
            {errors.details}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Getting your affirmation...' : 'Get Affirmation'}
      </button>
    </form>
  );
};

export default AffirmationForm;
