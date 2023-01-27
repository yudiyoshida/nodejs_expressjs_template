class PaginationHelper {
  public paginate(data: [any[], number], limit: number, page: number) {
    const [rows, count] = data;
    const result = {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count/limit),
      itemsPerPage: limit,
      page: page,
    };

    return result;
  }
}

export default new PaginationHelper();
