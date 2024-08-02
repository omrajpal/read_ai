/**
 * service/user-service.ts
 * Firebase service to handle user updates
 * @author  Ashok Saravanan
 * @updated 2024-08-01
 *
 */

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { User, UserData } from '../types/user'; // Importing the User and UserData types

export class UserService {
    private readonly firestore: FirebaseFirestoreTypes.Module;
    private readonly users: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

    constructor() {
        // React Native Firebase automatically initializes the default app instance
        this.firestore = firestore();
        this.users = this.firestore.collection('users');
    }

    async createUser(userData: UserData): Promise<FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>> {
        const user: User = {
            key: userData.key,
            time: new Date().toISOString(),
            user_data: userData,
        };
        return this.users.add(user);
    }

    async getUserById(id: string): Promise<User | null> {
        const userDoc = await this.users.doc(id).get();
        return userDoc.exists ? (userDoc.data() as User) : null;
    }

    async updateUser(id: string, userData: UserData): Promise<void> {
        const user: Partial<User> = {
            user_data: userData,
        };
        return this.users.doc(id).update(user);
    }

    async deleteUser(id: string): Promise<void> {
        return this.users.doc(id).delete();
    }
}
