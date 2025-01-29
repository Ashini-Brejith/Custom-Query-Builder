import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQueriesComponent } from './delete-queries.component';

describe('DeleteQueriesComponent', () => {
  let component: DeleteQueriesComponent;
  let fixture: ComponentFixture<DeleteQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
