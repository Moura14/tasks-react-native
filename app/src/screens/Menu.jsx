import { DrawerItem } from "@react-navigation/drawer";
import { ScrollView } from "react-native";



export default props => {
    return (
        <ScrollView>
            <DrawerItem {...props}></DrawerItem>
        </ScrollView>
    )
}