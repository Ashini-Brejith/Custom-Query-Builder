import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQueriesComponent } from './update-queries.component';

describe('UpdateQueriesComponent', () => {
  let component: UpdateQueriesComponent;
  let fixture: ComponentFixture<UpdateQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
