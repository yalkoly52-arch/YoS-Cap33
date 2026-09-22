
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, {
    Circle,
    Defs,
    Path,
    Stop,
    LinearGradient as SvgGradient,
} from "react-native-svg";

const { width } = Dimensions.get("window");

function YoSCapLogo() {
  return (
    <View style={styles.logoBox}>
      <View style={styles.logoGlow} />

      <Svg width={190} height={190} viewBox="0 0 190 190">
        <Defs>
          <SvgGradient
            id="purple"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <Stop offset="0" stopColor="#E7CFFF" />
            <Stop offset="0.45" stopColor="#A970FF" />
            <Stop offset="1" stopColor="#7138D8" />
          </SvgGradient>
        </Defs>

        <Circle
          cx="95"
          cy="95"
          r="82"
          fill="#10091C"
          stroke="#2B1B40"
          strokeWidth="2"
        />

        <Circle
          cx="95"
          cy="95"
          r="72"
          fill="none"
          stroke="url(#purple)"
          strokeWidth="3"
        />

        <Circle
          cx="95"
          cy="95"
          r="62"
          fill="none"
          stroke="#A970FF"
          strokeWidth="1"
          opacity={0.3}
        />

        {/* Headset */}
        <Path
          d="M55 98 C55 70 72 51 95 51 C118 51 135 70 135 98"
          fill="none"
          stroke="url(#purple)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Left ear */}
        <Path
          d="M58 91 C47 91 41 98 41 109 L41 118 C41 126 47 131 56 131 L61 131 L61 99"
          fill="#A970FF"
        />

        {/* Right ear */}
        <Path
          d="M132 91 C143 91 149 98 149 109 L149 118 C149 126 143 131 134 131 L129 131 L129 99"
          fill="#A970FF"
        />

        {/* Microphone */}
        <Path
          d="M95 66 C84 66 77 74 77 86 L77 101 C77 112 84 120 95 120 C106 120 113 112 113 101 L113 86 C113 74 106 66 95 66Z"
          fill="url(#purple)"
        />

        <Path
          d="M68 96 C68 117 78 130 95 130 C112 130 122 117 122 96"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <Path
          d="M95 130 L95 141"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <Path
          d="M83 141 L107 141"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export default function SignInScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* الخلفية */}
      <LinearGradient
        colors={["#090611", "#10091B", "#08060E"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Glow علوي */}
      <View style={styles.topGlow} />

      {/* دوائر ديكور */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ translateY: slide }],
          },
        ]}
      >
        <View style={styles.badge}>
          <View style={styles.liveDot} />
          <Text style={styles.badgeText}>عالمك الصوتي بدأ هنا</Text>
        </View>

        <YoSCapLogo />

        <Text style={styles.title}>
          YoS <Text style={styles.titlePurple}>Cap</Text>
        </Text>

        <Text style={styles.description}>
          ادخل عالمك الصوتي
        </Text>

        <Text style={styles.descriptionSmall}>
          اتكلم • العب • قابل ناس جديدة • استمتع
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/otp")}
          >
            <LinearGradient
              colors={["#B77CFF", "#7138D8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>تسجيل الدخول</Text>
              <Text style={styles.arrow}>←</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(auth)/register")}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>إنشاء حساب جديد</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          YoS Cap • مكانك للصوت واللعب
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08060E",
    overflow: "hidden",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 35,
  },

  topGlow: {
    position: "absolute",
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width,
    backgroundColor: "#5D27A8",
    opacity: 0.08,
    top: -width * 0.75,
    alignSelf: "center",
  },

  circleOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "#A970FF",
    opacity: 0.07,
    top: 70,
    left: -150,
  },

  circleTwo: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: "#A970FF",
    opacity: 0.06,
    bottom: 30,
    right: -120,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: "#151020",
    borderWidth: 1,
    borderColor: "#2A1B3D",
    marginBottom: 12,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#B77CFF",
    marginRight: 8,
  },

  badgeText: {
    color: "#CDBBE5",
    fontSize: 12,
    fontWeight: "700",
  },

  logoBox: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  logoGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#8C4CFF",
    opacity: 0.12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: -1,
    marginTop: -2,
  },

  titlePurple: {
    color: "#A970FF",
  },

  description: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },

  descriptionSmall: {
    color: "#847B91",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 7,
    textAlign: "center",
  },

  buttons: {
    width: "100%",
    marginTop: 30,
  },

  loginButton: {
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 21,
    marginLeft: 12,
  },

  registerButton: {
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#332447",
    backgroundColor: "#110D18",
    marginTop: 12,
  },

  registerText: {
    color: "#CDBBE5",
    fontSize: 15,
    fontWeight: "800",
  },

  footer: {
    color: "#51485C",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 25,
  },
});