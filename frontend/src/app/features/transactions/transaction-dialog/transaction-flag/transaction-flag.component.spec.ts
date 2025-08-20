import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFlagComponent } from './transaction-flag.component';

describe('TransactionFlagComponent', () => {
  let component: TransactionFlagComponent;
  let fixture: ComponentFixture<TransactionFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFlagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
