import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <RepoItem 
            name="android-project"
            imageurl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1022px-Android_robot.svg.png" 
            /> 
            
          <RepoItem 
            name="iOS-project"
            imageurl="https://logowik.com/content/uploads/images/ios1780.logowik.com.webp" 
            /> 
            
          <RepoItem 
            name="Ionic-project"
            imageurl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNPrhw75mJwZtTzvv7szTCJy7s43ulyWuXJQ&s" 
            />

        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
