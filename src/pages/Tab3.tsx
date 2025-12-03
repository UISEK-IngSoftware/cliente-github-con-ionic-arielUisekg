// ...existing code...
import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ padding: 12 }}>
          <IonCard>
            <img
              alt="cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf2sHR4EfEvaQcrvdQzN4V1w9It8JQgV0qNQ&s"
              style={{ width: '100%', height: 220, objectFit: 'cover' }}
            />
            <IonCardHeader>
              <IonCardTitle>Ariel Garcés</IonCardTitle>
              <IonCardSubtitle>@arielUisekg</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Estudiante de Ingeniería Informática
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
