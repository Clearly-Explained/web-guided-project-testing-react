import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MissionForm from './MissionForm';

test("renders without error", ()=> {
    render(<MissionForm/>);
});


test("renders loading message if isFetchingData is true", ()=> {
    //Arrange : render the component to the screen
    render(<MissionForm isFetchingData={true}/>);

    //Act : query for my loading message
    const message = screen.queryByText(/we are fetching data/i);
    const button = screen.queryByRole('button');

    //Assert : does the message exist
    expect(message).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
});

test("renders button if isFetchingData is false", ()=> {
    render(<MissionForm isFetchingData={false}/>);

    const message = screen.queryByText(/we are fetching data/i);
    const button = screen.queryByRole('button');

    expect(message).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

test("executes getData when the button is clicked", ()=> {
    const mockGetData = jest.fn();

    //Arrange : Render component with isFetchingData = false
    render(<MissionForm isFetchingData={false} getData={mockGetData}/>);

    //Act : get the button. click the button
    const button = screen.getByRole('button');
    userEvent.click(button);

    //Assert : Check that the mock was called 1 time.
    expect(mockGetData.mock.calls.length).toBe(1);
    expect(mockGetData.mock.calls).toHaveLength(1);
    expect(mockGetData).toBeCalled();
    expect(mockGetData).toBeCalledTimes(1);
});

