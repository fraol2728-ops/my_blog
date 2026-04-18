import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { commentType } from "./commentType";
import { leadType } from "./leadType";
import { projectType } from "./projectType";
import { feasibilityPostType } from "./feasibilityPostType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    commentType,
    leadType,
    projectType,
    feasibilityPostType,
  ],
};
