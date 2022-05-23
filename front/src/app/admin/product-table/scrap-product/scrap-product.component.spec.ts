import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapProductComponent } from './scrap-product.component';

describe('ScrapProductComponent', () => {
  let component: ScrapProductComponent;
  let fixture: ComponentFixture<ScrapProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
