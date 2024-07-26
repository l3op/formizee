import {openApiErrorResponses} from '@/lib/errors';
import {HTTPException} from 'hono/http-exception';
import {createRoute, z} from '@hono/zod-openapi';
import {and, db, eq, schema} from '@formizee/db';
import {ParamsKeySchema} from './schema';
import type {keys as keysAPI} from '.';

export const deleteRoute = createRoute({
  method: 'delete',
  tags: ['Keys'],
  summary: 'Delete a key',
  path: '/{id}',
  request: {
    params: ParamsKeySchema
  },
  responses: {
    200: {
      description: 'Delete a key',
      content: {
        'application/json': {
          schema: z.object({})
        }
      }
    },
    ...openApiErrorResponses
  }
});

export const registerDeleteKey = (api: typeof keysAPI) => {
  return api.openapi(deleteRoute, async context => {
    const {analytics} = context.get('services');
    const workspace = context.get('workspace');
    const {id} = context.req.valid('param');
    const rootKey = context.get('key');

    const key = await db.query.key.findFirst({
      where: and(
        eq(schema.key.workspaceId, workspace.id),
        eq(schema.key.id, id)
      )
    });

    if (!key) {
      throw new HTTPException(404, {
        message: 'Key not found'
      });
    }

    await db.delete(schema.key).where(eq(schema.key.id, id));

    await analytics.ingestFormizeeAuditLogs({
      event: 'key.delete',
      workspaceId: workspace.id,
      actor: {
        type: 'key',
        id: rootKey.id,
        name: rootKey.name
      },
      resources: [
        {
          id: key.id,
          type: 'key'
        }
      ],
      description: `Deleted ${key.id}`,
      context: {
        location: context.get('location'),
        userAgent: context.get('userAgent')
      }
    });

    return context.json({}, 200);
  });
};
