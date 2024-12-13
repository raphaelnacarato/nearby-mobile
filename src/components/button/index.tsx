import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
} from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

interface IconProps {
  icon: React.ComponentType<TablerIconProps>;
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>;
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
