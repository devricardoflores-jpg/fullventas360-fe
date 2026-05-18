import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTableComponent } from './producto-table.component';

describe('ProductoTableComponent', () => {
  let component: ProductoTableComponent;
  let fixture: ComponentFixture<ProductoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
