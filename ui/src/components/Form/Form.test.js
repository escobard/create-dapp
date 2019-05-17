import React from "react";
import { shallow } from "enzyme";
import DynamicForm from "./index";
import { postFormFields } from "../../constants";

describe("Form snapshot renders", () => {
  it("should render makeDonation form and fields correctly", () => {
    const component = shallow(<DynamicForm fields={postormFields} />);

    expect(component).toMatchSnapshot();
  });
});
