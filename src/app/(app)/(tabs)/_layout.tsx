import { Tabs } from "expo-router";
import { Text, View } from "react-native";

function TabIcon({
  icon,
  focused,
}: {
  icon: string;
  focused: boolean;
}) {
  return (
    <View
      style={{
        width: 48,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: focused ? "#24143A" : "transparent",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          opacity: focused ? 1 : 0.55,
        }}
      >
        {icon}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: "#A970FF",
        tabBarInactiveTintColor: "#777080",

        tabBarStyle: {
          position: "absolute",
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: "#0C0912",
          borderTopWidth: 1,
          borderTopColor: "#21192B",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⌂" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="rooms"
        options={{
          title: "الغرف",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🎙" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          title: "الألعاب",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🎮" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "حسابي",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="●" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}