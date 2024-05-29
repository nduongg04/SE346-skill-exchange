import { Redirect } from "expo-router";
import { useSession } from "../../context/AuthContext";
import GetData from "../../utils/getdata";

export default function Index() {
<<<<<<< HEAD
    const {user} = useSession();
    if (user) {
        return <Redirect href="/home" />;
    } else {
        return <Redirect href="/signing/Signing" />;
    }
   // return <Redirect href="/home"/>;
    
=======
	const { user } = useSession();
	if (user) {
		return <Redirect href="/home" />;
	} else {
		return <Redirect href="/signing/Signing" />;
	}
>>>>>>> ff9e2483edb1741ce3d280c4419d798adc04fc3f
}
