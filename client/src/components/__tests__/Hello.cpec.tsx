import * as React from "react";
import { shallow } from "enzyme";

import Hello from "../Hello";

describe("Hello component", () => {
    test("renders the Hello component with <h1>Hello!</h1>", () => {
        const result = shallow(<Hello />).contains(<h1>Hello!</h1>);
        expect(result).toBeTruthy();
    });
});
