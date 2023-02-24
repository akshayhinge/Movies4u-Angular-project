import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElipsisPipe } from './elipsis.pipe';
import { TimePipe } from './time.pipe';
import { DatePipe } from './date.pipe';
import { NumberWithCommasPipe } from './number-with-commas.pipe';
import { CharacterWithCommasPipe } from './character-with-commas.pipe';
import { NumberWithDoubleDigitsPipe } from './number-with-double-digits.pipe';
import { FullLanguagePipe } from './full-language.pipe';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { SafePipe } from './safe.pipe';


@NgModule({
  declarations: [
    ElipsisPipe,
    TimePipe,
    DatePipe,
    NumberWithCommasPipe,
    CharacterWithCommasPipe,
    NumberWithDoubleDigitsPipe,
    FullLanguagePipe,
    FilterPipe,
    SortPipe,
    SafePipe
  ],
  exports: [
    ElipsisPipe,
    TimePipe,
    DatePipe,
    NumberWithCommasPipe,
    CharacterWithCommasPipe,
    NumberWithDoubleDigitsPipe,
    FullLanguagePipe,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
