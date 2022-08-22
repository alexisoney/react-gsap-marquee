import React from "react";
import { Meta, Story } from "@storybook/react";

import Marquee from "./Marquee";

export default {
  title: "Marquee",
  component: Marquee,
  decorators: [
    (Story) => (
      <div style={{ height: "300vh", paddingTop: "50vh" }}>
        <div style={{ width: "80vw", margin: "0 auto" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<typeof Marquee> = (args) => <Marquee {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "The quick brown fox jumps over the lazy dog",
};

export const Speed = Template.bind({});
Speed.args = {
  ...Default.args,
  speed: 300,
};

export const MaxVelocity = Template.bind({});
MaxVelocity.args = {
  ...Default.args,
  maxVelocity: 300,
};

export const VelocityFactor = Template.bind({});
VelocityFactor.args = {
  ...Default.args,
  velocityFactor: 3,
};

export const AccellerationDuration = Template.bind({});
AccellerationDuration.args = {
  ...Default.args,
  accellerationDuration: 0.5,
};

export const Reversed = Template.bind({});
Reversed.args = {
  ...Default.args,
  isReversed: true,
};

export const ReverseOnScrollUp = Template.bind({});
ReverseOnScrollUp.storyName = "Reverse On Scroll Up (off)";
ReverseOnScrollUp.args = {
  ...Default.args,
  reverseOnScrollUp: false,
};

export const WithReactNode = Template.bind({});
WithReactNode.args = {
  children: (
    <div style={{ paddingRight: "50px" }}>
      <a href="https://picsum.photos/" style={{ display: "block" }}>
        Lorem Picsum
      </a>
      <img style={{ display: "block" }} src="https://picsum.photos/200" />
    </div>
  ),
};

export const Empty = Template.bind({});
