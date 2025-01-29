import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNameComponent } from './table-name.component';

describe('TableNameComponent', () => {
  let component: TableNameComponent;
  let fixture: ComponentFixture<TableNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
