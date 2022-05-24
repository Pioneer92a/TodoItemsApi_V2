import PaginationOptions from "./PaginationOptions";
import PaginationParams from "./PaginationOptions";

class PaginatedData<T> {
  info: PaginationOptions;
  data: T[];
  constructor(info: PaginationParams, data: T[]) {
    this.info = info;
    this.data = data;
  }
}

export default PaginatedData;
