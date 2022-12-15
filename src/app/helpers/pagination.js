class PaginationHelper {
  paginate(data, limit, page) {
    const [rows, count] = data;
    const result = {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count/limit),
      itemsPerPage: Number(limit),
      page: Number(page)
    };

    return result;
  }
}

module.exports = new PaginationHelper();