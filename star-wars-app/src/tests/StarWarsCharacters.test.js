import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import StarWarsCharacters from '../components/StarWarsCharacters';
import { render, wait, fireEvent } from '@testing-library/react';
import { getData as mockGetData } from '../api';

//creates a mock function for everything exported from ../api
jest.mock('../api');

test('Renders the StarWarsCharacters component with character list and functioning next and previous buttons', async () => {

    //The response data for the mock getData call
    const response = {
        next: null,
        previous: 'previousURL',
        results: [
            {
                url: 'characterURL',
                name: 'characterName'
            }
        ]
    }

    //Call the mockGetData function and respond with response data
    mockGetData.mockResolvedValueOnce(response);

    //render our component, so we can run tests on its contents.
    const wrapper = render(<StarWarsCharacters />);

    //Find the buttons based on the text in the button.
    const nextButton = wrapper.getByText(/next/i);
    const previousButton = wrapper.getByText(/previous/i);

    //Make sure buttons are clickable
    //Since next and previous are still null before the data from the api loads in,
    //The buttons are disabled. So they won't trigger a new getData event.
    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    //This code happens once the api (our mock api call - mockGetData) call is made
    await wait(() => {
        //make sure after the api call is made that a character with characterName appears on the page.
        expect(wrapper.getByText(/charactername/i)).toBeTruthy();
        //Since there is no next url, the next button should be disabled.
        expect(nextButton).toBeDisabled();
        expect(previousButton).toBeEnabled();

        //The previous button is now enabled. We want to make sure the function for
        //the previous button functions properly.
        //To do that we will have to use another fireEvent, this time on a live button.
        //This will make another getData call, so we have to provide a response for that call.
        mockGetData.mockResolvedValueOnce(response);

        //Fire a click event, this time on a live button.
        fireEvent.click(previousButton);

        //Make sure that when mockGetData was called, it was called with the url that
        //was provided to the previous button.
        expect(mockGetData).toHaveBeenCalledWith(response.previous);
    });
});