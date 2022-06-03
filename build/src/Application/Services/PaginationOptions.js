"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginationOptions {
    constructor(currentPage, perPage, totalTasks) {
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalItems = totalTasks;
        this.setTotalPages();
        this.setNextPage();
        this.setPreviousPage();
    }
    setTotalPages() {
        const quotient = ~~(this.totalItems / this.perPage);
        const remainder = this.totalItems % this.perPage;
        this.totalPages = remainder > 0 ? quotient + 1 : quotient;
    }
    setNextPage() {
        this.nextPage =
            this.currentPage < this.totalPages ? this.currentPage + 1 : 0;
    }
    setPreviousPage() {
        this.prevPage = this.currentPage > 1 ? this.currentPage - 1 : 0;
    }
    getOffset() {
        return (this.currentPage - 1) * this.perPage + 1;
    }
}
exports.default = PaginationOptions;
//# sourceMappingURL=PaginationOptions.js.map