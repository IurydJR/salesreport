import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManegementComponent } from './sales-manegement.component';

describe('SalesManegementComponent', () => {
  let component: SalesManegementComponent;
  let fixture: ComponentFixture<SalesManegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesManegementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesManegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
