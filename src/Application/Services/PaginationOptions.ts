import { HttpException, HttpStatus } from "@nestjs/common";
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
    this.throwErrorIfCurrentPageExceedsLimit();
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

  throwErrorIfCurrentPageExceedsLimit() {
    if (this.currentPage > this.totalPages)
      throw new HttpException(
        "requested page exceeds the max number of pages",
        HttpStatus.NOT_ACCEPTABLE
      );
  }
}

export default PaginationOptions;
