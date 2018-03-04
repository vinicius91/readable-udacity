import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("shallow renders correctly", () => {
    expect(shallow(<Footer />));
  });
  it("mount renders correctly", () => {
    expect(mount(<Footer />));
  });
});
