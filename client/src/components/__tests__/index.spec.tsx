import * as React from "react";
import { shallow } from "enzyme";

import App from "../common/app/index";

describe("App component", () => {
    test("renders the App component with <div className='indexfile'></div>", () => {
        const result = shallow(<App />).contains(<div className='indexfile'></div>);
        expect(result).toBeFalsy();
    });
});