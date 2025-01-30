import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropQueriesComponent } from './drop-queries.component';

describe('DropQueriesComponent', () => {
  let component: DropQueriesComponent;
  let fixture: ComponentFixture<DropQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
