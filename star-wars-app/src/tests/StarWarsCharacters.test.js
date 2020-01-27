import React from 'react';
import StarWarsCharacters from '../components/StarWarsCharacters';
import { render, wait, fireEvent } from '@testing-library/react';
import { getData as mockGetNewData } from '../api';

//creates a mock function for everything exported from ../api
// jest.mock('../api');

test('Renders the StarWarsCharacters component with character list and functioning next and previous buttons', async () => {
    const wrapper = render(<StarWarsCharacters />);

    const nextButton = wrapper.getByText(/next/i);
    const previousButton = wrapper.getByText(/previous/i);

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    
});