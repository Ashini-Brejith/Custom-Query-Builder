import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQueriesComponent } from './select-queries.component';

describe('SelectQueriesComponent', () => {
  let component: SelectQueriesComponent;
  let fixture: ComponentFixture<SelectQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
