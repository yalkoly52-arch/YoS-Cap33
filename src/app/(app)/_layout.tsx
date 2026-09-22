import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function OTPScreen() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputs = useRef<Array<TextInput | null>>([]);

  const updateCode = (value: string, index: number) => {
    const cleanValue = value.replace(/[^0-9]/g, "");

    if (!cleanValue) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    const newCode = [...code];
    newCode[index] = cleanValue.slice(-1);
    setCode(newCode);

    if (index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const verifyCode = () => {
    const otp = code.join("");

    if (phone.length < 8) {
      Alert.alert("تنبيه", "اكتب رقم الهاتف الأول");
      return;
    }

    if (otp.length !== 6) {
      Alert.alert("تنبيه", "اكتب كود التحقق كامل");
      return;
    }

    // مؤقتًا هنعتبر الكود صحيح.
    // بعد تجهيز السيرفر هنربطه بالـWhatsApp OTP الحقيقي.
    router.replace("/(app)/(tabs)");
  };

  return (
    <LinearGradient
      colors={["#180B32", "#0A0710", "#050408"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.content}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.iconCircle}>
              <Text style={styles.phoneEmoji}>📱</Text>
            </View>

            <Text style={styles.title}>تسجيل الدخول</Text>

            <Text style={styles.subtitle}>
              اكتب رقم هاتفك علشان نبعتلك كود التحقق
            </Text>

            <View style={styles.phoneContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇪🇬</Text>
                <Text style={styles.codeText}>+20</Text>
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder="رقم الهاتف"
                placeholderTextColor="#77717F"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(value) =>
                  setPhone(value.replace(/[^0-9]/g, ""))
                }
                maxLength={11}
              />
            </View>

            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendText}>إرسال كود التحقق</Text>
            </TouchableOpacity>

            <Text style={styles.otpTitle}>
              كود التحقق
            </Text>

            <View style={styles.otpRow}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    value ? styles.otpInputActive : null,
                  ]}
                  value={value}
                  onChangeText={(text) => updateCode(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.verifyButton}
              onPress={verifyCode}
            >
              <Text style={styles.verifyText}>
                تأكيد ودخول
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.resend}>
                لم يصلك الكود؟ إعادة الإرسال
              </Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safe: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 15,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#171020",
    borderWidth: 1,
    borderColor: "#30243D",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 38,
  },

  iconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#6D35C7",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 38,
    marginBottom: 24,
  },

  phoneEmoji: {
    fontSize: 36,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: "#AAA3B4",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
  },

  phoneContainer: {
    height: 58,
    borderRadius: 17,
    backgroundColor: "#15101D",
    borderWidth: 1,
    borderColor: "#33273F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  countryCode: {
    height: 44,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#352A40",
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    fontSize: 20,
    marginRight: 7,
  },

  codeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  phoneInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: 14,
  },

  sendButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: "#241638",
    borderWidth: 1,
    borderColor: "#6337A0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  sendText: {
    color: "#C9A9FF",
    fontSize: 15,
    fontWeight: "800",
  },

  otpTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 13,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpInput: {
    width: 47,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#15101D",
    borderWidth: 1,
    borderColor: "#33273F",
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
  },

  otpInputActive: {
    borderColor: "#8B5CF6",
    backgroundColor: "#1B1128",
  },

  verifyButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  verifyText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  resend: {
    color: "#A77CFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 22,
  },
});