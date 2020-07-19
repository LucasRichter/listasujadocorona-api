/**
 * @typedef Evidence
 * @property {string} description.required
 * @property {string} link.required
 */

/**
 * @typedef Politican
 * @property {string} name.required - Unique politican name
 * @property {string} profilePicture.required - Link politican image
 * @property {string} party.required - Politican party. EX: PT, PSDB
 * @property {string} state.required - Politican state. EX: RS, RJ, SP
 * @property {string} website
 * @property {Array.<Evidence>} evidences - Politican evidences
 */

/**
 * See pagination and filters in [node-restful](https://github.com/baugarten/node-restful).
 * @route GET /politicans
 * @group politicans: Politicos - Operations about politicans
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
*/

/**
 * Get single politican. This will inscrease the pageView field in 1.
 * @route GET /politicans/{id}
 * @group politicans: Politicos - Operations about politicans
 * @param {Politican.model} id.path.required
 * @returns {Politican.model} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
*/

/**
 * Get the first six politicans with more page views.
 * @route GET /politicans/trending
 * @group politicans: Politicos - Operations about politicans
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

/**
 * Create new politican.
 * @route POST /politicans
 * @group politicans: Politicos - Operations about politicans
 * @param {Politican.model} politican.body.required - the new politican
 * @returns {Politican.model} 204 - A new politican created
 * @returns {Error}  default - Unexpected error
*/

/**
 * Update a single politican. No nees de _id in body.
 * @route PUT /politicans/{id}
 * @group politicans: Politicos - Operations about politicans
 * @param {Politican.model} id.path.required
 * @param {Politican.model} politican.body.required - the new politican
 * @returns {Politican.model} 204 - A politican updated
 * @returns {Error}  default - Unexpected error
*/

/**
 * Delete a single politican.
 * @route DELETE /politicans/{id}
 * @group politicans: Politicos - Operations about politicans
 * @param {Politican.model} id.path.required
 * @returns {Politican.model} 200 - A politican deleted
 * @returns {Error}  default - Unexpected error
*/
