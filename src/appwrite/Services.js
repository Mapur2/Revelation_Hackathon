import { Client, ID, Databases, Storage, Query } from "appwrite";
import { apprwriteid, bucket, database, market, places, restaurants, url } from "../../config";


export class Service {
    client = new Client();
    databases;
    bucketStor;

    constructor() {
        this.client
            .setEndpoint(url)
            .setProject(apprwriteid);
        this.databases = new Databases(this.client);
        this.bucketStor = new Storage(this.client);
    }

    async createPlace({ name, content, location, bannerPic, city, pics, stars, map }) {
        try {
            return await this.databases.createDocument(
                database,
                places, ID.unique(),
                {
                    name,
                    content,
                    location,
                    bannerPic,
                    city,
                    pics,
                    stars,
                    map
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async createRestaurant({ name, content, bannerPic, city, pics, stars, map, zomato, swiggy }) {
        try {
            return await this.databases.createDocument(
                database,
                restaurants, ID.unique(),
                {
                    name,
                    content,
                    bannerPic,
                    city,
                    pics,
                    stars,
                    map,
                    zomato, swiggy
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async createMarket({ name, content, bannerPic, location,maps}) {
        try {
            return await this.databases.createDocument(
                database,
                market, ID.unique(),
                {
                    name,
                    content,
                    bannerPic,
                    location,
                    maps,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                database,
                places,
                id
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                database,
                places,

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucketStor.createFile(
                bucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucketStor.deleteFile(
                bucket,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucketStor.getFilePreview(
            bucket,
            fileId
        )
    }

    async deleteImage(fileid){
        return this.bucketStor.deleteFile(
            bucket,
            fileid
        )
    }
}


const service = new Service()
export default service