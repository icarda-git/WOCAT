import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaginatedListComponent } from './filter-paginated-list.component';

describe('FilterPaginatedListComponent', () => {
  let component: FilterPaginatedListComponent;
  let fixture: ComponentFixture<FilterPaginatedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPaginatedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPaginatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
