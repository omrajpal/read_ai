import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { COLORS } from '../constants';


export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "/(drawer)/home",
};

export default function Layout() {

    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleDrawerPress = () => {
        console.log("opened")
    };

    return (
        <Drawer screenOptions={{ headerShown: false }}>

            <Drawer.Screen
                name="(drawer)/home"
                options={{
                    drawerLabel: "Explore",
                    title: "Explore",
                    drawerIcon: ({ size, color }) => {
                        return <Ionicons name="md-globe" size={size} color={COLORS.secondary} /> // globe may not exist
                    },
                    drawerPress: (e) => {
                        e.preventDefault();
                        handleDrawerPress();
                    }
                }}

            ></Drawer.Screen>

            <Drawer.Screen
                name="(drawer)/journey"
                options={{
                    drawerLabel: "Journey",
                    title: "Journey",
                    drawerIcon: ({ size, color }) => {
                        return <Ionicons name="boat" size={size} color={COLORS.secondary} />
                    },
                }}
            ></Drawer.Screen>

            <Drawer.Screen
                name="(drawer)/favorites"
                options={{
                    drawerLabel: "Favorites",
                    title: "Favorites",
                    drawerIcon: ({ size, color }) => {
                        return <Ionicons name="md-heart" size={size} color={COLORS.secondary} />
                    },
                }}
            ></Drawer.Screen>

            <Drawer.Screen
                name="(drawer)/my-books"
                options={{
                    drawerLabel: "My Books",
                    title: "My Books",
                    drawerIcon: ({ size, color }) => {
                        return <Ionicons name="book" size={size} color={COLORS.secondary} />
                    },
                }}
            ></Drawer.Screen>

            <Drawer.Screen
                name="(drawer)/about"
                options={{
                    drawerLabel: "About Us",
                    title: "About Us",
                    drawerIcon: ({ size, color }) => {
                        return <Ionicons name="md-people" size={size} color={COLORS.secondary} />
                    },
                }}
            ></Drawer.Screen>

            <Drawer.Screen
                // Name of the route to hide.
                name="index"
                options={{
                    drawerItemStyle: { width: 0 },
                    drawerLabel: () => null,
                    href: null,
                }}
            />
            <Drawer.Screen
                // Name of the route to hide.
                name="hero/index"

                options={{
                    drawerItemStyle: { width: 0 },
                    drawerLabel: () => null,
                    href: null,
                }}
            />
            <Drawer.Screen
                // Name of the route to hide.
                name="questionnare/index"
                options={{
                    drawerItemStyle: { width: 0 },
                    drawerLabel: () => null,
                    href: null,
                }}
            />
            <Drawer.Screen
                // Name of the route to hide.
                name="settings"
                options={{
                    drawerItemStyle: { width: 0 },
                    drawerLabel: () => null,
                    href: null,
                }}
            />

        </Drawer>
    );
}