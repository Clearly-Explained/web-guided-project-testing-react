import React from 'react';
import { screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import { fetchMissions } from './api/fetchMissions';
jest.mock('./api/fetchMissions');


test("renders without errors", ()=> {
    render(<App />);
});

test("Renders all missions that are returned from fetchMissions", async () => {
    fetchMissions.mockResolvedValueOnce({
        data: [
            {mission_id: 1, mission_name: "test 1"},
            {mission_id: 2, mission_name: "test 2"},
            {mission_id: 3, mission_name: "test 3"},
        ]
    });
    
    //Arrange: render our App component
    render(<App/>);
    
    //Act:
    //  1. find button
    //  2. click button
    const button = screen.getByRole('button');
    userEvent.click(button);


    //Assert:
    //  get all items with testid mission and check for 10 missions
    const missions = await screen.findAllByTestId("mission");
    expect(missions).toHaveLength(3);
});