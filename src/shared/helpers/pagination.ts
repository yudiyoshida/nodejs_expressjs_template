class PaginationHelper {
  public paginate(data: [any[], number], limit: number, page: number) {
    const [rows, count] = data;
    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count/limit),
      itemsPerPage: limit,
      page: page,
    };
  }
}

export default new PaginationHelper();
