import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const API_URL = "http://10.68.205.95:8000";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function createAccount() {
    if (!name.trim()) {
      Alert.alert("YoS Cap", "اكتب اسمك الأول");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("YoS Cap", "اكتب رقم الهاتف");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "حدث خطأ أثناء إنشاء الحساب");
      }

      Alert.alert(
        "تم إنشاء حسابك 🎉",
        `أهلاً ${data.name}\n\nYoS ID الخاص بك:\n${data.yos_id}`,
        [
          {
            text: "دخول",
            onPress: () => router.replace("/(app)/(tabs)"),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "حصلت مشكلة",
        error instanceof Error
          ? error.message
          : "تعذر الاتصال بالسيرفر",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <LinearGradient
        colors={["#08050F", "#12091F", "#08060E"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.logo}>
            <Text style={styles.logoText}>Y</Text>
          </View>

          <Text style={styles.brand}>
            YoS <Text style={styles.brandPurple}>Cap</Text>
          </Text>

          <Text style={styles.title}>إنشاء حسابك</Text>

          <Text style={styles.subtitle}>
            ابدأ عالمك الصوتي واستمتع بالغرف والألعاب
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>الاسم</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="اكتب اسمك"
              placeholderTextColor="#6F667B"
              style={styles.input}
              textAlign="right"
            />

            <Text style={styles.label}>رقم الهاتف</Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="01xxxxxxxxx"
              placeholderTextColor="#6F667B"
              keyboardType="phone-pad"
              style={styles.input}
              textAlign="right"
            />

            <Text style={styles.label}>البريد الإلكتروني</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="اختياري"
              placeholderTextColor="#6F667B"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              textAlign="right"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={createAccount}
              disabled={loading}
            >
              <LinearGradient
                colors={["#C084FF", "#7435D8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.createButton}
              >
                <Text style={styles.createText}>
                  {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginHint}>عندك حساب بالفعل؟</Text>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-in")}
          >
            <Text style={styles.loginLink}>تسجيل الدخول</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            بإنشاء الحساب أنت توافق على شروط استخدام YoS Cap
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08060E",
    overflow: "hidden",
  },

  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 35,
    alignItems: "center",
  },

  glowTop: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: "#803FE8",
    opacity: 0.08,
    top: -170,
    right: -100,
  },

  glowBottom: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#A15CFF",
    opacity: 0.06,
    bottom: -130,
    left: -100,
  },

  back: {
    position: "absolute",
    left: 20,
    top: 48,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#151020",
    borderWidth: 1,
    borderColor: "#2C2040",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 32,
    lineHeight: 34,
    marginTop: -3,
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181025",
    borderWidth: 1,
    borderColor: "#5D3490",
    marginTop: 25,
  },

  logoText: {
    color: "#C084FF",
    fontSize: 40,
    fontWeight: "900",
  },

  brand: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 10,
  },

  brandPurple: {
    color: "#A970FF",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    marginTop: 28,
  },

  subtitle: {
    color: "#857A91",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  card: {
    width: "100%",
    borderRadius: 26,
    backgroundColor: "#100C18",
    borderWidth: 1,
    borderColor: "#281B38",
    padding: 20,
  },

  label: {
    color: "#C9BBD5",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    width: "100%",
    height: 55,
    borderRadius: 16,
    backgroundColor: "#181220",
    borderWidth: 1,
    borderColor: "#2A2035",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 15,
  },

  createButton: {
    height: 57,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  createText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  loginHint: {
    color: "#756B80",
    fontSize: 13,
    marginTop: 24,
  },

  loginLink: {
    color: "#B77CFF",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
  },

  footer: {
    color: "#4F4658",
    fontSize: 10,
    textAlign: "center",
    marginTop: 25,
    paddingHorizontal: 25,
  },
});