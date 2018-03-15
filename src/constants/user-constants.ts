import { User } from '../shared-types';

export const defaultUser: User = {
    name: "guest",
    id: "invalidId"
}

export const OWNER_NAME = "me";

export const forbiddenNames: string[] = [defaultUser.name, OWNER_NAME]