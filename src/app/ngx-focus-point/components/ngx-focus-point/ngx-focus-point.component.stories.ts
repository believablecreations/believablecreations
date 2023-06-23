import type {Meta, StoryObj} from '@storybook/angular';
import {moduleMetadata} from "@storybook/angular";
import {NgxFocusPointComponent} from "./ngx-focus-point.component";
import {NgxFocusPointModule} from "../../ngx-focus-point.module";

type StoryType = NgxFocusPointComponent
export default {
  title: 'Example/FocusPoint',
  component: NgxFocusPointComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgxFocusPointModule],
    })
  ],
  render: (args) => {
    const {focusX, focusY, ...props} = args;

    return {
      props,
      template:
        `<ngx-focus-point><img src="https://66.media.tumblr.com/8fd2436a90888b09af3c1eeefe8ef250/tumblr_p6ud1vgk6g1qjac96o1_1280.jpg">
        </ngx-focus-point>`
    }
  },
  argTypes: {
    focusX: {
      control: 'number',
    },
    focusY: {
      control: 'number'
    }
  },
  args: {
    focusX: 0,
    focusY: 0,
  }
} as Meta<StoryType>;

export const FocusPoint: StoryObj<StoryType> = {
  args: {
    focusX: 0,
    focusY: 0,
  }
}


