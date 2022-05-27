import {
  default as PaginationOptions,
  default as PaginationParams,
} from "./PaginationOptions";

class PaginatedData<T> {
  info: PaginationOptions;
  data: T[];
  constructor(info: PaginationParams, data: T[]) {
    this.info = info;
    this.data = data;
  }
}

export default PaginatedData;
