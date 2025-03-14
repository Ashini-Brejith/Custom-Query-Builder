import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitComponent } from './limit.component';



describe('LimitComponent', () => {
  let component: LimitComponent;
  let fixture: ComponentFixture<LimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
