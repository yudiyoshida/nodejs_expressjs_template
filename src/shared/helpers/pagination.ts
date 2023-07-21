class PaginationHelper {
  public paginate(data: any[], limit: number, page: number) {
    return {
      data: data,
      totalItems: data.length,
      totalPages: Math.ceil(data.length/limit),
      itemsPerPage: limit,
      page: page,
    };
  }
}

export default new PaginationHelper();
