import Swiper from "react-native-deck-swiper";
import ProfileCard from "../cards/ProfileCard";
import PostData from "../../../utils/postdata";

const SwiperList = ({ users, onSwiped, swiperRef, onSwipedAll }) => {
    const baseUrl = "https://se346-skillexchangebe.onrender.com"

    // const { user } = useSession();
	const user = {
		_id: "6637113c92bdb2d7e5c22ffa",
		username: "Nguyen Thu",
		email: "thu@gmail.com",
		phoneNumber: "0987654321",
		avatar:
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Ffree-images.jpg?alt=media&token=04ccc7aa-f5e6-4ad6-afc3-5a05be7707d6",
		imageCerti: [
			"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2Fcertified.jpg?alt=media&token=42ba5bda-3129-4d80-9e34-4df101f955ed",
		],
		description: ["I'm an engineer"],
		userTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258cc",
				name: "Electronics",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FElectronics.png?alt=media&token=249f9898-c5d1-4d62-8b5d-320dbc7e6e4a",
				__v: 0,
				id: "66168dbd7c0f4757e77258cc",
			},
			{
				_id: "66168dbd7c0f4757e77258ce",
				name: "Leadership Skills",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FLeadership%20Skills.png?alt=media&token=c9141fb4-756b-4a2d-96e4-3a9d736392d7",
				__v: 0,
				id: "66168dbd7c0f4757e77258ce",
			},
			{
				_id: "66168dbd7c0f4757e77258d4",
				name: "Coding",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FCoding.png?alt=media&token=2b9d5877-6edf-4bc6-b0ba-a35f6e5eb2e8",
				__v: 0,
				id: "66168dbd7c0f4757e77258d4",
			},
		],
		learnTopicSkill: [
			{
				_id: "66168dbd7c0f4757e77258dc",
				name: "Management Skills",
				imageUrl:
					"https://firebasestorage.googleapis.com/v0/b/skillexchange-62da0.appspot.com/o/files%2FManagement%20Skills.png?alt=media&token=b52e7a57-3f02-4045-927b-71d44ae3e249",
				__v: 0,
				id: "66168dbd7c0f4757e77258dc",
			},
		],
		skill: ["English"],
		birthDay: "2004-08-11T00:00:00.000Z",
		rankElo: 0,
		__v: 0,
		id: "6637113c92bdb2d7e5c22ffa",
	};

	return (
		<Swiper
			ref={swiperRef}
			onSwipedRight={(index) => {
                PostData(`${baseUrl}/api/v1/request/create`, {
                    senderID: user.id,
                    receiverID: users[index].id,
                })
            }}

			cardStyle={{ height: "100%", width: "100%" }}
			onSwiped={onSwiped}
			cardHorizontalMargin={0}
			backgroundColor="white"
			swipeBackCard
			renderCard={(user, index) => {
				return (
					<ProfileCard
                        skill={user?.skill}
                        birthDay={user?.birthDay}
						username={user?.username}
						userTopicSkill={user?.userTopicSkill}
						imageDisplay={user?.avatar}
						imageCerti={user?.imageCerti}
						description={user?.description}
						key={index}
					/>
				);
			}}
			cards={users}
			cardVerticalMargin={0}
			onSwipedAll={onSwipedAll}
			showSecondCard={true}
			stackSize={3}
			disableTopSwipe={true}
			disableBottomSwipe={true}
			stackSeparation={5}
			overlayLabels={{
				left: {
					title: "NOPE",
					style: {
						label: {
							backgroundColor: "#FF6767",
							borderColor: "#FF6767",
							color: "white",
							borderWidth: 1,
						},
						wrapper: {
							flexDirection: "column",
							alignItems: "flex-end",
							justifyContent: "flex-start",
							marginTop: 30,
							marginLeft: -30,
						},
					},
				},
				right: {
					title: "MATCH",
					style: {
						label: {
							backgroundColor: "#4ECB71",
							borderColor: "#4ECB71",
							color: "white",
							borderWidth: 1,
						},
						wrapper: {
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							marginTop: 30,
							marginLeft: 30,
						},
					},
				},
			}}
			animateOverlayLabelsOpacity
			animateCardOpacity
		/>
	);
};

export default SwiperList;
