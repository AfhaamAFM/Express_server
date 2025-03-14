const response = {
  /**
   *
   * @param {Number} status
   * @param {Array} payload
   * @param {String} message
   * @param {string} fetched
   * @param {String} req_status
   * @returns  response Object
   * @description This is a function to return template to send response
   */
  standared: (
    status = 200,
    payload = [],
    message = 'The Data Fetched Succcessfully',
    req_status = 'success',
    pagination = {
      isPagination: false,
      'pagination-count': 0,
      'pagination-page': 0,
      'pagination-limit': 0,
    }
  ) => {
    return {
      status,
      payload,
      message,
      req_status,
      pagination,
      'content-Type': 'application/json',
    };
  },

  // >=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=
  /**
     * 
     * @param {Number} status 
     * @param {Array} errors 
     * @param {String} req_status 
     * @param {String} message 
     * @returns validation response Object
     * @description This is a function to return template to send response

     */
  validation: (status: number = 400, error = {}, req_status: string = 'failed', message: string = 'validation Error') => {
    return {
      status,
      error,
      req_status,
      message,
    };
  },
  // >=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=
  /**
     * 
     * @param {Number} status 
     * @param {String} message 
     * @param {String} error 
     * @param {String} req_status
     * @param {Array} errorPayload 
     * @returns validation response Object
     * @description This is a function to return template to send response

     */
  InternalServer: (status: number = 500, message: string = 'Internal server error', err_message = 'error reason not mentioned', req_status: string = 'failed', errorPayload: Array<any> = []) => {
    return {
      status,
      err_message,
      req_status,
      message,
      errorPayload: JSON.stringify(errorPayload),
    };
  },

  // >=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=
  /**
     * 
     * @param {Number} status 
     * @param {Boolean} created 
     * @param {Array} payload 
     * @param {String} message 
     * @param {String} creation_id 
     * @returns validation response Object
     * @description This is a function to return template to send response

     */
  creation: (status: number = 201, created: boolean = true, payload: Array<any> = [], message: string = '', creation_id: string = '') => {
    return {
      status,
      created,
      payload,
      message,
      creation_id,
    };
  },
  // >=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=>=>=>=<=
};

export default response;
