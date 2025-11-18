{/*///C:\Users\yosef\Desktop\onmotor-strapi\src\api\article\content-types\article\schema.json}
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "headline": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "subdescription": {
      "type": "string"
    },
    "href": {
      "type": "string"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images",
        "files",
        "videos",
        "audios"
      ]
    },
    "imageSrc": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images",
        "files",
        "videos",
        "audios"
      ]
    },
    "imageAlt": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "subcategory": {
      "type": "json"
    },
    "display": {
      "type": "json"
    },
    "priority": {
      "type": "integer"
    },
    "author": {
      "type": "string"
    },
    "date": {
      "type": "date"
    },
    "time": {
      "type": "time"
    },
    "tags": {
      "type": "json"
    },
    "content": {
      "type": "blocks"
    },
    "tableData": {
      "type": "json"
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": [
        "images",
        "files",
        "videos",
        "audios"
      ]
    },
    "comments": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::comment.comment",
      "mappedBy": "article"
    },
    "Values": {
      "type": "enumeration",
      "required": false,
      "enum": [
        "guide-tech",
        "guide-beginner",
        "guide-buy",
        "guide-advanced"
      ]
    },
    "tags_txt": {
      "type": "string"
    },
    "externalImageUrls": {
      "type": "text"
    },
    "external_media_links": {
      "type": "json"
    }
  }
}
*/}

//C:\Users\yosef\Desktop\onmotor-strapi\src\api\article\controllers\article.ts
/**
 * article controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::article.article');
///

