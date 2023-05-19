import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import CardItem, { CardProps } from './CardItem';

const mockUser = {
  id: 1,
  username: 'JohnDoe',
  avatar: 'avatar.jpg',
};

describe('CardItem', () => {
  const defaultProps: CardProps = {
    user: mockUser,
    rating: 4.5,
    typeUser: 'positive',
    withRating: true,
    minFunction: jest.fn(),
    maxFunction: jest.fn(),
    handlePositiveRating: jest.fn(),
    handleNegativeRating: jest.fn(),
  };


  test('renders correctly without rating', () => {
    const { queryByText } = render(<CardItem {...defaultProps} withRating={false} />);
    const ratingElement = queryByText('(4.5)');

    expect(ratingElement).toBeNull();
  });

  test('calls minFunction with correct arguments when "Понизить" button is clicked', () => {
    const { getByText } = render(<CardItem {...defaultProps} />);
    const decreaseButton = getByText('Понизить');
    fireEvent.click(decreaseButton);

    expect(defaultProps.minFunction).toHaveBeenCalledTimes(1);
    expect(defaultProps.minFunction).toHaveBeenCalledWith(mockUser, '-', 'positive');
  });

  test('calls maxFunction with correct arguments when "Повысить" button is clicked', () => {
    const { getByText } = render(<CardItem {...defaultProps} />);
    const increaseButton = getByText('Повысить');
    fireEvent.click(increaseButton);

    expect(defaultProps.maxFunction).toHaveBeenCalledTimes(1);
    expect(defaultProps.maxFunction).toHaveBeenCalledWith(mockUser, '+', 'positive');
  });

  test('calls handlePositiveRating with correct argument when "+" button is clicked', () => {
    const { getByText } = render(<CardItem {...defaultProps} withRating={false} />);
    const positiveButton = getByText('+');
    fireEvent.click(positiveButton);

    expect(defaultProps.handlePositiveRating).toHaveBeenCalledTimes(1);
    expect(defaultProps.handlePositiveRating).toHaveBeenCalledWith(mockUser);
  });

  test('calls handleNegativeRating with correct argument when "-" button is clicked', () => {
    const { getByText } = render(<CardItem {...defaultProps} withRating={false} />);
    const negativeButton = getByText('-');
    fireEvent.click(negativeButton);

    expect(defaultProps.handleNegativeRating).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleNegativeRating).toHaveBeenCalledWith(mockUser);
  });
});
