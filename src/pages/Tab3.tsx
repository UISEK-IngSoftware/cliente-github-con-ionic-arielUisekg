import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, useIonViewDidEnter } from '@ionic/react';
import { getUserInfo } from '../services/GithubService';

import './Tab3.css';
import { UserInfo } from '../interfaces/UserInfo';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import AuthService from '../services/AuthService';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const history=useHistory();
  const loadUserInfo = async () => {
    try {
      const info = await getUserInfo();
      setUserInfo(info);
    } catch (err) {
      console.error('Error cargando información de usuario', err);
    }
  };
    useIonViewDidEnter(() => {
    loadUserInfo();
  }, []);
  const handleLogout = () => {
    AuthService.logout();
    history.replace('/login');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img
            alt={userInfo?.login ?? 'avatar'}
            src={userInfo?.avatar_url ?? 'https://via.placeholder.com/150'}
            style={{ width: 120, height: 120, borderRadius: 8, display: 'block', margin: '16px auto' }}
          />
          <IonCardHeader>
            <IonCardTitle>{userInfo?.name ?? userInfo?.login ?? 'Usuario'}</IonCardTitle>
            <IonCardSubtitle>{userInfo?.login ?? '—'}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{userInfo?.bio ?? 'Sin biografía'}</IonCardContent>
        </IonCard>
        <IonButton expand="block" color="danger" onClick={handleLogout}>
          <IonIcon slot="start" icon={logOutOutline}></IonIcon>
          Cerrar sesión
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;