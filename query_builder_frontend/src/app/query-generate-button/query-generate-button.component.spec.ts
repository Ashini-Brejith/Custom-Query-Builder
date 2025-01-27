import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryGenerateButtonComponent } from './query-generate-button.component';

describe('QueryGenerateButtonComponent', () => {
  let component: QueryGenerateButtonComponent;
  let fixture: ComponentFixture<QueryGenerateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryGenerateButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryGenerateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
