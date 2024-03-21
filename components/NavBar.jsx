import { Image } from "expo-image";
import black from "@assets/icons/black-square.png";

const NavBar = () => {
	return (
		<Image
			source={black}
			contentFit="fill"
			style={{ width: "100%", height: "100%" }}
		/>
	);
};

export default NavBar;
