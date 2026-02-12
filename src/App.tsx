import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import AffirmationForm from './components/AffirmationForm/AffirmationForm';
import OutputBox from './components/OutputBox/OutputBox';
import { useAffirmation } from './hooks/useAffirmation';
import { AffirmationRequest } from './types';

const App: React.FC = () => {
  const { affirmation, error, isLoading, submitRequest } = useAffirmation();


  const handleSubmit = (data: AffirmationRequest): void => {
    submitRequest(data);
  };

  const outputContent = error || affirmation;
  const isError = !!error;

  return (
    <div className="app">
      <Header />
      
      <main className="main-container">
        <div className="content-card">
          <h2 className="card-title">Get Your Affirmation</h2>
          <p className="card-subtitle">
            Fill in the form below to receive a personalized message
          </p>
          
          <AffirmationForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <OutputBox 
            content={outputContent}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
