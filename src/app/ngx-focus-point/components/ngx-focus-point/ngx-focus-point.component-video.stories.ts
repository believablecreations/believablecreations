import type {Meta, StoryObj} from '@storybook/angular';
import {moduleMetadata} from "@storybook/angular";
import {NgxFocusPointComponent} from "./ngx-focus-point.component";
import {NgxFocusPointModule} from "../../ngx-focus-point.module";





const NgxFocusPointComponentVideoMeta: Meta<NgxFocusPointComponent | any> = {
  title: 'Media/NGX Focus Point/Video',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [NgxFocusPointModule],
    })
  ],

  component: NgxFocusPointComponent,
  argTypes: {
    focusX: {
      control: 'number',
    },
    focusY: {
      control: 'number'
    },
    url: {
      control: 'text',
      description: 'Changes the displaid image.'
    }
  },

  render: (args) => {
    const {focusX, focusY,  ...props} = args;

    return {
      props,
      template:
        `<ngx-focus-point [focusX]="${args.focusX}" [focusY]="${args.focusY}" >
            <video>
            <source src="${args.url}" type="video/mp4">
            </video>
        </ngx-focus-point>`
    }
  },

};





export default NgxFocusPointComponentVideoMeta;
type Story = StoryObj<NgxFocusPointComponent>;

type StoryType = NgxFocusPointComponent | any;


export const NgxFocusPointVideo1: StoryObj<StoryType> = {
  args: {
    focusX: 0,
    focusY: 0,
    url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
  },
};


