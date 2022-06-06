"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class PaginationOptions {
    constructor(currentPage, perPage, totalTasks) {
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalItems = totalTasks;
        this.setTotalPages();
        this.setNextPage();
        this.setPreviousPage();
        this.throwErrorIfCurrentPageExceedsLimit();
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
    throwErrorIfCurrentPageExceedsLimit() {
        if (this.currentPage > this.totalPages)
            throw new common_1.HttpException("requested page exceeds the max number of pages", common_1.HttpStatus.NOT_ACCEPTABLE);
    }
}
exports.default = PaginationOptions;
//# sourceMappingURL=PaginationOptions.js.map