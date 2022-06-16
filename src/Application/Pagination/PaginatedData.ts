import {
  default as PaginationOptions,
  default as PaginationParams,
} from "@app/Pagination/PaginationOptions";

class PaginatedData<T> {
  info: PaginationOptions;
  data: T[];
  constructor(info: PaginationParams, data: T[]) {
    this.info = info;
    this.data = data;
  }
}

export default PaginatedData;
