'use strict';

const registerCollectionType = (contentType, { registry, strapi, builders }) => {
  const { service: getService } = strapi.plugin('graphql');

  const { naming } = getService('utils');
  const { KINDS } = getService('constants');

  // Types name (as string)
  const types = {
    base: naming.getTypeName(contentType),
    entity: naming.getEntityName(contentType),
    response: naming.getEntityResponseName(contentType),
    responseCollection: naming.getEntityResponseCollectionName(contentType),
    queries: naming.getEntityQueriesTypeName(contentType),
    mutations: naming.getEntityMutationsTypeName(contentType),
  };

  const getConfig = kind => ({ kind, contentType });

  // Type definition
  registry.register(types.base, builders.buildTypeDefinition(contentType), getConfig(KINDS.type));

  // Higher level entity definition
  registry.register(
    types.entity,
    builders.buildEntityDefinition(contentType),
    getConfig(KINDS.entity)
  );

  // Responses definition
  registry.register(
    types.response,
    builders.buildResponseDefinition(contentType),
    getConfig(KINDS.entityResponse)
  );

  registry.register(
    types.responseCollection,
    builders.buildResponseCollectionDefinition(contentType),
    getConfig(KINDS.entityResponseCollection)
  );

  // Query extensions
  registry.register(
    types.queries,
    builders.buildCollectionTypeQueries(contentType),
    getConfig(KINDS.query)
  );

  // Mutation extensions
  registry.register(
    types.mutations,
    builders.buildCollectionTypeMutations(contentType),
    getConfig(KINDS.mutation)
  );
};

module.exports = { registerCollectionType };