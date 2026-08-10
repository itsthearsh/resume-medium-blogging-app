"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createBlogInput: () => createBlogInput,
  signinInput: () => signinInput,
  signupInput: () => signupInput,
  updateBlogInput: () => updateBlogInput
});
module.exports = __toCommonJS(index_exports);
var import_zod = require("zod");
var signupInput = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(6),
  name: import_zod.z.string().optional()
});
var signinInput = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(6)
});
var createBlogInput = import_zod.z.object({
  title: import_zod.z.string().min(1),
  content: import_zod.z.string().min(1),
  published: import_zod.z.boolean().optional(),
  tagIds: import_zod.z.array(import_zod.z.string()).optional()
});
var updateBlogInput = import_zod.z.object({
  id: import_zod.z.string(),
  title: import_zod.z.string().min(1).optional(),
  content: import_zod.z.string().min(1).optional(),
  published: import_zod.z.boolean().optional(),
  tagIds: import_zod.z.array(import_zod.z.string()).optional()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBlogInput,
  signinInput,
  signupInput,
  updateBlogInput
});
