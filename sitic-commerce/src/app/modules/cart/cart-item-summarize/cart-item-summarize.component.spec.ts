import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemSummarizeComponent } from './cart-item-summarize.component';

describe('CartItemSummarizeComponent', () => {
  let component: CartItemSummarizeComponent;
  let fixture: ComponentFixture<CartItemSummarizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemSummarizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemSummarizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
