import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles } from "../utils/styles";
const HeaderBackButton = ({ style }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons
        name='arrow-back-ios'
        style={[styles.headerBackIcon, style]}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
