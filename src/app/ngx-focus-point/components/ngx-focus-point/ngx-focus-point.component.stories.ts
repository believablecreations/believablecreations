import type {Meta, StoryObj} from '@storybook/angular';
import {moduleMetadata} from "@storybook/angular";
import {NgxFocusPointComponent} from "./ngx-focus-point.component";
import {NgxFocusPointModule} from "../../ngx-focus-point.module";





const NgxFocusPointComponentMeta: Meta<NgxFocusPointComponent | any> = {
  title: 'Media/NGX Focus Point/Image',
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
      description: 'Changes the displayed image.'
    }
  },
  render: (args) => {
    const {focusX, focusY,  ...props} = args;
    return {
      props,
      template:
        `<ngx-focus-point [focusX]="${args.focusX}" [focusY]="${args.focusY}" >
            <img src="${args.url}">
        </ngx-focus-point>`
    }
  },

};





export default NgxFocusPointComponentMeta;
type Story = StoryObj<NgxFocusPointComponent>;

type StoryType = NgxFocusPointComponent | any;


export const NgxFocusPointImg1: StoryObj<StoryType> = {
  args: {
    focusX: 0,
    focusY: 0,
    url: 'https://66.media.tumblr.com/8fd2436a90888b09af3c1eeefe8ef250/tumblr_p6ud1vgk6g1qjac96o1_1280.jpg',
  },
};

export const NgxFocusPointImg2: StoryObj<StoryType> = {
  args: {
    focusX: 0,
    focusY: 0.4,
    url: 'https://i.pinimg.com/originals/8c/31/78/8c31784ff80e298290207f6745107b73.jpg',
  },
};
