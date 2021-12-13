import React from 'react';
import { screen, render } from '@testing-library/react';
import MissionsList from './MissionsList';

test("renders without errors", ()=> {
    render(<MissionsList missions={[]}/>);
});

test("renders no missions and then renders 3 missions on rerendering", ()=> {
    //Arrange 1
    const { rerender } = render(<MissionsList missions={[]}/>);

    //Act 1
    let missions = screen.queryAllByTestId('mission');

    //Assert 1
    expect(missions).toHaveLength(0);

    //Arrange 2
    rerender(<MissionsList missions={[
        {mission_id:1, mission_name: "Test 1"},
        {mission_id:2, mission_name: "Test 2"},
        {mission_id:3, mission_name: "Test 3"}
    ]}/>)

    //Act 3
    missions = screen.queryAllByTestId('mission');

    //Assert 3
    expect(missions).toHaveLength(3);
});