import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import UserRaitingSystem from './UserRaitingSystem';

describe('UserRaitingSystem', () => {
  test('renders correctly', () => {
    const { getByText } = render(<UserRaitingSystem/>);
    
    const refreshButton = getByText('Список пользователей');
    
    expect(refreshButton).toBeInTheDocument();
  });

});
