import { Tabs } from "expo-router";
import { COLORS } from "@constants";
import { NavBar } from "../../components";
import useShowNavBar from "../../utils/useShowNavBar";

export default function TabLayout() {
    const { showNavBar } = useShowNavBar();
	return (
		<Tabs
			initialRouteName="Index"
			screenOptions={{ tabBarStyle: { backgroundColor: COLORS.lightWhite}}}
			tabBar={(props) => <NavBar {...props} />}
		></Tabs>
	);
}
