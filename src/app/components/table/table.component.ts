import {AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, Input, OnChanges, QueryList, ViewChild} from '@angular/core';
import {MatColumnDef, MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';


type TableData = { [key: string]: any };

@Component({
  selector: 'fa-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  providers: [
    {
      provide: MatSort,
      useExisting: forwardRef(() => TableComponent)
    }
  ]
})
export class TableComponent<T> extends MatSort implements OnChanges, AfterViewInit {

  @Input() readonly = false;
  @Input({required: true}) tableData!: TableData[];
  @Input() pageSizeOptions: number[] = [15];
  @Input() onRowActivateFn?: ((value: T) => void);

  protected displayedColumns!: string[];
  protected dataSource!: MatTableDataSource<TableData>;

  @ViewChild('tableContainer', {read: ElementRef}) private tableContainer!: ElementRef<HTMLDivElement>;
  @ViewChild(MatTable) private table!: MatTable<TableData>;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ContentChildren(MatColumnDef) private viewColumnDefs!: QueryList<MatColumnDef>;
  private selection = new SelectionModel<TableData>(false, []);

  constructor() {
    super();
    this.dataSource = new MatTableDataSource<TableData>();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.displayedColumns = this.viewColumnDefs.map(colDef => colDef.name);
      this.viewColumnDefs.forEach(colDef => this.table.addColumnDef(colDef));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this;
      this.dataSource.data = this.tableData;
      this.dataSource.paginator?.page.subscribe(() => this.selection.clear());
    })
  }

  override ngOnChanges() {
    super.ngOnChanges();
    this.dataSource.data = this.tableData;
  }

  onTableKeydown(event: KeyboardEvent) {
    // Only process if the container is focused.
    if (document.activeElement !== this.tableContainer.nativeElement) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNextRow();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousRow();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.selectFirstRow();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.selectLastRow();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const row = this.selection.selected[0];
      if (row) {
        this.onRowActivate(row as T);
      }
    }
  }

  selectNextRow() {
    const data = this.getPageRows();
    const selectedRow = this.selection.selected[0];
    let index = data.findIndex(row => row === selectedRow) + 1;
    index = index === data.length ? 0 : index;
    this.selection.select(data[index]);
  }

  selectPreviousRow() {
    const data = this.getPageRows();
    const selectedRow = this.selection.selected[0];
    let index = data.findIndex(row => row === selectedRow) - 1;
    index = index < 0 ? data.length - 1 : index;
    this.selection.select(data[index]);
  }

  selectedRow(row: TableData) {
    this.selection.select(row);
  }

  isSelected(row: TableData): boolean {
    return this.selection.isSelected(row);
  }

  onRowActivate(row: T) {
    this.onRowActivateFn?.(row);
  }

  selectFirstRow() {
    this.selection.select(this.getPageRows()[0]);
  }

  selectLastRow() {
    const rows = this.getPageRows();
    this.selection.select(rows[rows.length - 1]);
  }

  onTableFocus() {
    if (this.selection.isEmpty()) {
      this.selectFirstRow();
    }
  }

  onTableBlur() {
    setTimeout(() => {
      if (!this.tableContainer.nativeElement.contains(document.activeElement)) {
        this.selection.clear();
      }
    });
  }

  private getPageRows() {
    const start = this.paginator.pageIndex * this.paginator.pageSize;
    const end = start + this.paginator.pageSize;
    return this.dataSource.filteredData.slice(start, end);
  }

}
