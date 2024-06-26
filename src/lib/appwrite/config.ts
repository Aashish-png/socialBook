import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appwriteConfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_URL,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,

    // collections 
    userCollectionId:import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    savesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    postsCollectionId:import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,

}


// export const appwriteConfig={
//     projectId:'65de28482c143e76a87f',
//     url:'https://cloud.appwrite.io/v1',

// }

export const client= new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const account= new Account(client)
export const database= new Databases(client)
export const storage= new Storage(client)
export const avatars= new Avatars(client)