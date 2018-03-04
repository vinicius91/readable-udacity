import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("<App />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<App />));
  });
  it("mount renders correctly", () => {
    expect(mount(<App />));
  });
});
