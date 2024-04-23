import { createStackNavigator } from '@react-navigation/stack';
import EnterName from '../../components/register/EnterName';
import UploadPhoto from '../../components/register/UploadPhoto';
import About from '../../components/register/About';
import SkillInput from '../../components/register/SkillInput';
import UploadCertification from '../../components/register/UploadCertification';
import ChooseTopic from '../../components/register/ChooseTopic';
import UploadInfo from '../../components/register/UploadInfo';
import Login from '../../components/login/login';
import ForgotPassword from '../../components/login/ForgotPassword';
const Stack = createStackNavigator();

export default function Signing() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="EnterName" 
          component={EnterName}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="UploadPhoto" 
          component={UploadPhoto} 
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{headerShown: false}}/>
        <Stack.Screen
          name="SkillInput"
          component={SkillInput}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="UploadCertification"
          component={UploadCertification}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="ChooseTopic"
          component={ChooseTopic}
          options={{headerShown: false}}/>
        <Stack.Screen
          name="UploadInfo"
          component={UploadInfo}
          options={{headerShown: false}}/>
      </Stack.Navigator>      
  );
}