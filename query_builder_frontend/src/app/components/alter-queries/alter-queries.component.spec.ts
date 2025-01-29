import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterQueriesComponent } from './alter-queries.component';

describe('AlterQueriesComponent', () => {
  let component: AlterQueriesComponent;
  let fixture: ComponentFixture<AlterQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
