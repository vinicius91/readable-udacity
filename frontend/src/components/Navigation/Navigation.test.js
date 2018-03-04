import React from "react";
import { shallow, mount } from "enzyme";
import Navigation from "./Navigation";

describe("<Navigation />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Navigation />));
  });
  it("mount renders correctly", () => {
    expect(mount(<Navigation />));
  });
});
