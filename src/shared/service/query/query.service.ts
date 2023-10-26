import { Injectable } from '@nestjs/common';
import { Queries } from './query.type';

@Injectable()
export class QueryService {
  constructor() {}

  applyQueries<T>(
    data: T[],
    queries: Queries,
    compFunc?: (a: T, b: T) => number,
  ): { data: T[]; totalRows: number } {
    const filteredData = this.filterData(data, queries.search);

    const sortedData = this.sortData(
      filteredData,
      queries.orderBy,
      queries.orderType,
      compFunc,
    );

    const pagingData = this.pagingData(sortedData, queries.page, queries.rpp);

    return { data: pagingData, totalRows: filteredData.length };
  }

  private filterData<T>(data: T[], key?: string): T[] {
    if (key) {
      return data.filter((el) => this.validateCondition(el, key));
    }

    return data;
  }

  private validateCondition<T>(el: T, key: string): boolean {
    for (const prop in el) {
      if (typeof el[prop] === 'object') {
        if (this.validateCondition(el[prop], key)) {
          return true;
        }
      } else if (el[prop]?.toString().search(key) > -1) {
        return true;
      }
    }

    return false;
  }

  private sortData<T>(
    data: T[],
    field?: string,
    order?: 'asc' | 'desc',
    compFunc?: (a: T, b: T) => number,
  ): T[] {
    if (field) {
      data.sort(compFunc);

      if (order === 'desc') {
        data.reverse();
      }
    }

    return data;
  }

  private pagingData<T>(data: T[], page?: number, rpp?: number): T[] {
    if (page) {
      const start = (page - 1) * rpp;
      const end = page * rpp;

      return data.slice(start, end);
    }

    return data;
  }
}
