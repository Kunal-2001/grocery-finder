import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsearchComponent } from './itemsearch.component';

describe('ItemsearchComponent', () => {
  let component: ItemsearchComponent;
  let fixture: ComponentFixture<ItemsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
