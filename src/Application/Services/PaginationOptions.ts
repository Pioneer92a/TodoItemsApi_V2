class PaginationOptions {
  currentPage: number;
  perPage: number;
  totalItems: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;

  constructor(currentPage: number, perPage: number, totalTasks: number) {
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.totalItems = totalTasks;
    this.setTotalPages();
    this.setNextPage();
    this.setPreviousPage();
  }

  private setTotalPages() {
    const quotient = ~~(this.totalItems / this.perPage);
    const remainder = this.totalItems % this.perPage;
    this.totalPages = remainder > 0 ? quotient + 1 : quotient;
  }

  private setNextPage() {
    this.nextPage =
      this.currentPage < this.totalPages ? this.currentPage + 1 : 0;
  }

  private setPreviousPage() {
    this.prevPage = this.currentPage > 1 ? this.currentPage - 1 : 0;
  }

  getOffset() {
    return (this.currentPage - 1) * this.perPage + 1;
  }
}

export default PaginationOptions;
