import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders correctly', () => {
    const fetchUsers = jest.fn();
    const { getByText } = render(<Navbar fetchUsers={fetchUsers} />);
    
    const refreshButton = getByText('Обновить список');
    const nextPageButton = getByText('Следующая страница');
    
    expect(refreshButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
  });
  
  
  test('clicking "Следующая страница" button calls fetchUsers with true argument', () => {
    const fetchUsers = jest.fn();
    const { getByText } = render(<Navbar fetchUsers={fetchUsers} />);
    
    const nextPageButton = getByText('Следующая страница');
    fireEvent.click(nextPageButton);
    
    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledWith(true);
  });
});
