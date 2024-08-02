// storageHelpers.js
import * as SecureStore from 'expo-secure-store';
import { UserService } from '../service/user-service';
import { UserData } from "../types/user"
const userService = new UserService();

// Get the user data from AsyncStorage
export const fetchLocalData = async (key) => {
    try {
        const jsonData = await SecureStore.getItemAsync(key);
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error("Error fetching data from SecureStore", error);
        return null;
    }
}

// Save user data to AsyncStorage
export const saveLocalData = async (key, data) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(data));
        console.log(JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
    }
}

// Remove user data from AsyncStorage
const clearLocalData = async (key) => {
    console.log(`Clearing data for user with key: ${key}`);
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error("Error clearing data from AsyncStorage", error);
    }
}

// Check if the user exists in the backend
const userExistsOnBackend = async (key: string): Promise<boolean> => {
    try {
        console.log(`Checking user with key: ${key}`);
        const user = await userService.getUserById(key);
        return !!user;
    } catch (error) {
        console.error("Error checking user on backend", error);
        return false;
    }
}

// Update backend database
const updateBackend = async (key: string, data: UserData): Promise<void> => {
    try {
        console.log(`Updating user with key: ${key}`);
        await userService.updateUser(key, data);
    } catch (error) {
        console.error("Error updating backend", error);
    }
}

// Update user data both locally and on the backend
export const updateUser = async (key: string, updates: Partial<UserData>): Promise<void> => {
    const userData: UserData = await fetchLocalData(key) || {} as UserData;

    // Apply all updates to the local userData object
    for (const [field, value] of Object.entries(updates)) {
        if (typeof field === "string") {
            (userData as any)[field] = value;
        } else if (Array.isArray(field)) {
            const fieldArray = field as string[];
            let target = userData as any;
            for (let i = 0; i < fieldArray.length - 1; i++) {
                if (!target[fieldArray[i]]) target[fieldArray[i]] = {};
                target = target[fieldArray[i]];
            }
            target[fieldArray[fieldArray.length - 1]] = value;
        }
    }

    // Save the updated data locally
    await saveLocalData(key, userData);

    // Check if the user exists on the backend
    const exists = await userExistsOnBackend(key);

    if (exists) {
        // Update user data on the backend
        await updateBackend(key, userData);
    } else {
        // If the user does not exist on the backend, create a new user
        const newUser: UserData = {
            key: key,
            name: userData.name || '',
            cat: userData.cat || '',
            gen: userData.gen || '',
            favorites: userData.favorites || [],
            booksRead: userData.booksRead || [],
            booksReading: userData.booksReading || [],
            booksOpened: userData.booksOpened || 0,
            modal: userData.modal || { initial: false, 'v1.1': false }
        };
        await userService.createUser(newUser);
    }
}

// Reset local and backend data for a user
export const resetLocalAndBackendData = async (key) => {
    // Clear local data
    await clearLocalData(key);

    // Check if the user exists on the backend
    const exists = await userExistsOnBackend(key);

    // If user exists on the backend, delete their data
    if (exists) {
        await deleteFromBackend(key);
    }
}

export const deleteFromBackend = async (key) => {
    try {
        console.log(`Deleting user with key: ${key}`);
        await userService.deleteUser(key);
    } catch (error) {
        console.error("Error deleting user from backend", error);
    }
}

// unneed code
export const legacyUser = async () => {
    const dataString = await SecureStore.getItemAsync('data');
    if (dataString) { // legacy user
        const [name, catGen] = dataString.split('*');
        const cat = catGen.substring(0, 24);
        const gen = catGen.substring(24);

        const favoritesString = await SecureStore.getItemAsync('favorites');
        const favorites = favoritesString ? favoritesString.split(' ') : [];

        return {
            "name": name,
            "cat": cat,
            "gen": gen,
            "favorites": favorites
        }
    }
    return null
}

export const migrateData = async (uuidv4, updates) => {
    try {
        await updateUser(uuidv4, updates);

        try {
            await SecureStore.deleteItemAsync('favorites');
            await SecureStore.deleteItemAsync('data');
            console.log("Deletion successful");
        } catch {
            console.error("Error deleting old keys");
        }
    } catch (error) {
        console.error("Error during migration:", error);
    }
}
