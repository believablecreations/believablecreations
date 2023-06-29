import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxFocusPointComponent} from './components/ngx-focus-point/ngx-focus-point.component';
import {NgxFocusPointSelectComponent} from './components/ngx-focus-point-select/ngx-focus-point-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OnResizeService} from "./services/on-resize.service";

@NgModule({
  declarations: [NgxFocusPointComponent, NgxFocusPointSelectComponent],
  providers: [OnResizeService],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], exports: [NgxFocusPointComponent, NgxFocusPointSelectComponent]
})
export class NgxFocusPointModule {
}
