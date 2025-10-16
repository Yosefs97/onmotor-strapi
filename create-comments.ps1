# יצירת מערכת תגובות מלאה ב-Strapi v4

Write-Host "🚀 Creating Comment API..."

# יצירת תיקיות
New-Item -ItemType Directory -Force -Path "src/api/comment/content-types/comment" | Out-Null
New-Item -ItemType Directory -Force -Path "src/api/comment/controllers" | Out-Null
New-Item -ItemType Directory -Force -Path "src/api/comment/routes" | Out-Null
New-Item -ItemType Directory -Force -Path "src/api/comment/services" | Out-Null
New-Item -ItemType Directory -Force -Path "src/api/comment/policies" | Out-Null

# ---------- schema.json ----------
@'
{
  "kind": "collectionType",
  "collectionName": "comments",
  "info": {
    "singularName": "comment",
    "pluralName": "comments",
    "displayName": "Comment",
    "description": "User comments on articles"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "content": {
      "type": "text",
      "required": true
    },
    "article": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::article.article",
      "inversedBy": "comments"
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user",
      "inversedBy": "comments"
    },
    "likes": {
      "type": "integer",
      "default": 0
    },
    "status": {
      "type": "enumeration",
      "enum": ["pending", "approved", "rejected"],
      "default": "pending"
    }
  }
}
'@ | Set-Content -Path "src/api/comment/content-types/comment/schema.json" -Encoding UTF8

# ---------- controller ----------
@'
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('You must be logged in to post a comment');
    }

    ctx.request.body.data.author = user.id;
    return await super.create(ctx);
  }
}));
'@ | Set-Content -Path "src/api/comment/controllers/comment.js" -Encoding UTF8

# ---------- service ----------
@'
'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comment.comment');
'@ | Set-Content -Path "src/api/comment/services/comment.js" -Encoding UTF8

# ---------- routes ----------
@'
'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/comments',
      handler: 'comment.find',
      config: {
        auth: false
      }
    },
    {
      method: 'POST',
      path: '/comments',
      handler: 'comment.create',
      config: {
        policies: []
      }
    },
    {
      method: 'PUT',
      path: '/comments/:id',
      handler: 'comment.update',
      config: {
        policies: ['api::comment.is-owner']
      }
    },
    {
      method: 'DELETE',
      path: '/comments/:id',
      handler: 'comment.delete',
      config: {
        policies: ['api::comment.is-owner']
      }
    }
  ]
};
'@ | Set-Content -Path "src/api/comment/routes/comment.js" -Encoding UTF8

# ---------- policy ----------
@'
'use strict';

module.exports = async (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;
  if (!user) return false;

  const commentId = policyContext.params.id;
  const comment = await strapi.entityService.findOne(
    'api::comment.comment',
    commentId,
    { populate: ['author'] }
  );

  return comment && comment.author && comment.author.id === user.id;
};
'@ | Set-Content -Path "src/api/comment/policies/is-owner.js" -Encoding UTF8

Write-Host "All comment API files created."
Write-Host ""
Write-Host " Next steps:"
Write-Host " npm run build"
Write-Host "npm run develop"
Write-Host ""
Write-Host 'Then open Strapi Admin and you will see the Comment collection.'
