import {EndpointSchema, ParamsSchema} from './schema';
import {openApiErrorResponses} from '@/lib/errors';
import {HTTPException} from 'hono/http-exception';
import type {endpoints as endpointsAPI} from '.';
import {createRoute} from '@hono/zod-openapi';

export const getRoute = createRoute({
  method: 'get',
  tags: ['Endpoints'],
  summary: 'Retrieve a endpoint',
  path: '/{id}',
  request: {
    params: ParamsSchema
  },
  responses: {
    200: {
      description: 'Retrieve a endpoint',
      content: {
        'application/json': {
          schema: EndpointSchema
        }
      }
    },
    ...openApiErrorResponses
  }
});

export const registerGetEndpoint = (api: typeof endpointsAPI) => {
  return api.openapi(getRoute, async context => {
    const workspace = context.get('workspace');
    const {database} = context.get('services');
    const {id} = context.req.valid('param');

    const endpoint = await database.query.endpoint.findFirst({
      where: (table, {and, eq}) =>
        and(eq(table.workspaceId, workspace.id), eq(table.id, id))
    });

    if (!endpoint) {
      throw new HTTPException(404, {
        message: 'Endpoint not found'
      });
    }

    const response = EndpointSchema.parse(endpoint);
    return context.json(response, 200);
  });
};
