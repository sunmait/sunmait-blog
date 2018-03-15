import * as React from "react";
import { shallow } from "enzyme";

import AppComponent from "../containers/Router";

test("renders the heading", () => {
    const result = shallow(<AppComponent />).contains(<div className='app-container'></div>);
    expect(result).toBeTruthy();
});