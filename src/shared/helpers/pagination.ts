class PaginationHelper {
  public paginate(data: any[], limit: number, page: number) {
    const count = data.length;

    return {
      data: data,
      totalItems: count,
      totalPages: Math.ceil(count/limit),
      itemsPerPage: limit,
      page: page,
    };
  }
}

export default new PaginationHelper();
