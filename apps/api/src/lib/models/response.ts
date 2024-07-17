import {
  APIKeySchema,
  EndpointSchema,
  MemberSchema,
  SubmissionSchema,
  TeamSchema,
  UserSchema
} from '@/schemas';
import type {z} from '@hono/zod-openapi';
import type {
  APIKey,
  Endpoint,
  Member,
  Submission,
  Team,
  User
} from 'domain/models';
import shortUUID from 'short-uuid';

type UserResponse = z.infer<typeof UserSchema>;
type TeamResponse = z.infer<typeof TeamSchema>;
type APIKeyResponse = z.infer<typeof APIKeySchema>;
type MemberResponse = z.infer<typeof MemberSchema>;
type EndpointResponse = z.infer<typeof EndpointSchema>;
type SubmissionResponse = z.infer<typeof SubmissionSchema>;

export const userResponse = (data: User): UserResponse => {
  const id = shortUUID().fromUUID(data.id);

  const linkedEmails = data.linkedEmails.map(linkedEmail => {
    return {email: linkedEmail.email, isVerified: linkedEmail.isVerified};
  });

  const normalizedData = {
    id,
    name: data.name,
    email: data.email,
    isVerified: data.isVerified,
    linkedEmails,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  };

  return UserSchema.parse(normalizedData);
};

export const teamResponse = (data: Team): TeamResponse => {
  const id = shortUUID().fromUUID(data.id);

  const availableEmails = data.availableEmails.map(email => {
    return email.value;
  });

  const normalizedData = {
    id,
    name: data.name,
    plan: data.plan,
    availableEmails,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  };

  return TeamSchema.parse(normalizedData);
};

export const memberResponse = (data: Member): MemberResponse => {
  const id = shortUUID().fromUUID(data.id);

  const normalizedData = {
    id,
    role: data.role,
    permissions: data.permissions
  };

  return MemberSchema.parse(normalizedData);
};

export const endpointResponse = (data: Endpoint): EndpointResponse => {
  const id = shortUUID().fromUUID(data.id);

  const targetEmails = data.targetEmails.map(email => email.value);

  const normalizedData = {
    id,
    name: data.name,
    team: data.team,
    isEnabled: data.isEnabled,
    emailNotifications: data.emailNotifications,
    redirectUrl: data.redirectUrl,
    color: data.color,
    icon: data.icon,
    targetEmails,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt
  };

  return EndpointSchema.parse(normalizedData);
};

export const submissionResponse = (data: Submission): SubmissionResponse => {
  const id = shortUUID().fromUUID(data.id);
  const endpointId = shortUUID().fromUUID(data.endpoint);

  const normalizedData = {
    id,
    endpointId,
    data: data.data,
    isSpam: data.isSpam,
    isRead: data.isRead,
    createdAt: data.createdAt
  };

  return SubmissionSchema.parse(normalizedData);
};

export const apiKeyResponse = (data: APIKey): APIKeyResponse => {
  const id = shortUUID().fromUUID(data.id);
  const userId = shortUUID().fromUUID(data.userId);
  let expiresAt: string | Date = data.expiresAt;
  if (data.expiresAt.getFullYear() === 3333) {
    expiresAt = 'never';
  }
  const normalizedData = {
    id,
    scope: data.scope,
    userId,
    lastAccess: data.lastAccess,
    createdAt: data.createdAt,
    expiresAt
  };

  if (data.teamId !== '') {
    return APIKeySchema.parse({
      teamId: shortUUID().fromUUID(data.teamId),
      ...normalizedData
    });
  }
  return APIKeySchema.parse(normalizedData);
};
