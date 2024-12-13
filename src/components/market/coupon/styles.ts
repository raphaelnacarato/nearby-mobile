import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
    marginBottom: 12,
  },

  content: {
    flexDirection: "row",
    backgroundColor: colors.green.soft,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },

  code: {
    fontSize: 16,
    color: colors.gray[600],
    fontFamily: fontFamily.semiBold,
    textTransform: "uppercase",
  },
});
