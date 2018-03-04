import React from "react";
import { shallow, mount } from "enzyme";
import Home from "./Home";

describe("<Home />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Home />));
  });
  it("mount renders correctly", () => {
    expect(mount(<Home />));
  });
});
