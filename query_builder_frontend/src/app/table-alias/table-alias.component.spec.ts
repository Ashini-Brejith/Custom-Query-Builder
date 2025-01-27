import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAliasComponent } from './table-alias.component';

describe('TableAliasComponent', () => {
  let component: TableAliasComponent;
  let fixture: ComponentFixture<TableAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAliasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
