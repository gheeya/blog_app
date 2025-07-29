import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const account = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (account) {
        // log user in
        const session = await this.login(email, password);
        if (session) {
          return session;
        }
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getCurrentUserInfo() {
    try {
      const userData = await this.account.get();
      return userData;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

export default new AuthServices();
