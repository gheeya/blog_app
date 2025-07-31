import { Client, Databases, Query, Storage, ID } from "appwrite";
import config from "../config/config.js";

class DbServices {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  /**
   * Our Post has this structure
   * {
   *      title:Post Title
   *      slug: Unique ID of the post(Basically post.$id)
   *      content:Post Content
   *      featuredImage: ID returned from file upload of the actual image
   *      status:active/inactive
   *      userId: $id of the user who created the account
   * }
   */

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const document = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return document;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedDoc = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return updatedDoc;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const document = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return document;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const documents = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return documents;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const res = await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      );
      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  previewFile(fileId) {
    try {
      const fileLink = this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
      );
      return fileLink;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export default new DbServices();
