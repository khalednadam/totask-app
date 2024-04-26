/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 20)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    try {
      const sort = buildSort(options.sortBy);
      const limit = parseInt(options.limit, 20) || 20;
      const page = parseInt(options.page, 10) || 1;
      const skip = (page - 1) * limit;

      const countPromise = this.countDocuments(filter).exec();
      let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

      if (options.populate) {
        docsPromise = populateFields(docsPromise, options.populate);
      }

      docsPromise = docsPromise.exec();

      const [totalResults, results] = await Promise.all([countPromise, docsPromise]);

      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      
      return result;
    } catch (error) {
      throw new Error(`Pagination failed: ${error.message}`);
    }
  };

  /**
   * Build sorting criteria from options.sortBy
   * @param {string} sortBy - Sorting criteria
   * @returns {string} - Formatted sorting criteria
   */
  function buildSort(sortBy) {
    if (sortBy) {
      const sortingCriteria = sortBy.split(',').map(sortOption => {
        const [key, order] = sortOption.split(':');
        return (order === 'desc' ? '-' : '') + key;
      });
      return sortingCriteria.join(' ');
    }
    return 'createdAt';
  }

  /**
   * Populate fields in the query
   * @param {Query} query - Mongoose query
   * @param {string} populateFields - Fields to populate
   * @returns {Query} - Updated Mongoose query
   */
  function populateFields(query, populateFields) {
    return populateFields.split(',').reduce((query, populateOption) => {
      const path = populateOption.split('.').reverse().reduce((a, b) => ({ path: b, populate: a }));
      return query.populate(path);
    }, query);
  }
};

module.exports = paginate;
