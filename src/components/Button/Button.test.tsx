import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with title and description', () => {
    const mockHandleEvent = jest.fn();
    render(<Button title="Test Title" description="Test Description" onHandleEvent={mockHandleEvent} />);

    const buttonElement = screen.getByRole('button');
    const titleElement = screen.getByText(/Test Title/i);
    const descriptionElement = screen.getByText(/Test Description/i);

    expect(buttonElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(mockHandleEvent).toHaveBeenCalledTimes(1);
});

test('button click calls onHandleEvent', () => {
    const mockHandleEvent = jest.fn();
    render(<Button title="Test Title" description="Test Description" onHandleEvent={mockHandleEvent} />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);
    expect(mockHandleEvent).toHaveBeenCalledTimes(1);
});
