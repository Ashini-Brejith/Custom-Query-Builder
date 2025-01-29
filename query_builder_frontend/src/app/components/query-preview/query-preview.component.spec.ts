import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPreviewComponent } from './query-preview.component';

describe('QueryPreviewComponent', () => {
  let component: QueryPreviewComponent;
  let fixture: ComponentFixture<QueryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
