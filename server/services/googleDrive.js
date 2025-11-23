const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

/**
 * Google Drive Service
 * Handles photo backup to Google Drive
 */

class GoogleDriveService {
  constructor() {
    this.drive = null;
    this.initialized = false;
  }

  /**
   * Initialize Google Drive with OAuth2 credentials
   * @param {Object} credentials - Google OAuth2 credentials from user
   */
  async initialize(credentials) {
    try {
      const { client_id, client_secret, redirect_uri, refresh_token } = credentials;

      const oauth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uri
      );

      oauth2Client.setCredentials({
        refresh_token: refresh_token
      });

      this.drive = google.drive({ version: 'v3', auth: oauth2Client });
      this.initialized = true;

      return true;
    } catch (error) {
      console.error('Error initializing Google Drive:', error);
      throw error;
    }
  }

  /**
   * Get or create wedding folder in Google Drive
   * @param {String} folderName - Name of the folder to create
   */
  async getOrCreateFolder(folderName) {
    if (!this.initialized) {
      throw new Error('Google Drive not initialized');
    }

    try {
      // Search for existing folder
      const response = await this.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      if (response.data.files.length > 0) {
        return response.data.files[0].id;
      }

      // Create new folder
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      };

      const folder = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id'
      });

      return folder.data.id;
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  /**
   * Upload a file to Google Drive
   * @param {String} filePath - Local file path
   * @param {String} fileName - Name for the file in Drive
   * @param {String} folderId - Google Drive folder ID
   */
  async uploadFile(filePath, fileName, folderId) {
    if (!this.initialized) {
      throw new Error('Google Drive not initialized');
    }

    try {
      const fileMetadata = {
        name: fileName,
        parents: [folderId]
      };

      const media = {
        mimeType: this.getMimeType(filePath),
        body: fs.createReadStream(filePath)
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink'
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Upload multiple files to Google Drive
   * @param {Array} files - Array of {path, name} objects
   * @param {String} folderName - Folder name in Drive
   */
  async uploadMultipleFiles(files, folderName) {
    if (!this.initialized) {
      throw new Error('Google Drive not initialized');
    }

    try {
      const folderId = await this.getOrCreateFolder(folderName);
      const results = [];

      for (const file of files) {
        try {
          const result = await this.uploadFile(file.path, file.name, folderId);
          results.push({
            success: true,
            fileName: file.name,
            driveId: result.id,
            webViewLink: result.webViewLink
          });
        } catch (error) {
          results.push({
            success: false,
            fileName: file.name,
            error: error.message
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  /**
   * Get MIME type from file extension
   */
  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.m4a': 'audio/mp4'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  /**
   * Generate OAuth2 authorization URL
   * @param {String} clientId
   * @param {String} redirectUri
   */
  static getAuthUrl(clientId, redirectUri) {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      '', // client_secret not needed for auth URL
      redirectUri
    );

    const scopes = [
      'https://www.googleapis.com/auth/drive.file'
    ];

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  static async getTokensFromCode(code, clientId, clientSecret, redirectUri) {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );

    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  }
}

module.exports = GoogleDriveService;
