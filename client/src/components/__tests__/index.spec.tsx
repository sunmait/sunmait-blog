import * as React from "react";
import { shallow } from "enzyme";

import App from "../common/app/index";

test("renders the heading", () => {
    const result = shallow(<App />).contains(<div className='indexfile'></div>);
    expect(result).toBeFalsy();
});