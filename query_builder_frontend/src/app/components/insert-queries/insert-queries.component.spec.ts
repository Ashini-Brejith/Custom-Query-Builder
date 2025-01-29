import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertQueriesComponent } from './insert-queries.component';

describe('InsertQueriesComponent', () => {
  let component: InsertQueriesComponent;
  let fixture: ComponentFixture<InsertQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
