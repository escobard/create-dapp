import React from "react";
import { shallow } from "enzyme";
import Footer from "./index";

describe("Footer snapshot renders", () => {
  it("should render correctsssly mode", () => {
    const component = shallow(<Footer />);

    expect(component).toMatchSnapshot();
  });
});
