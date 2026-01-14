import React, { useState } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonTextarea, 
  useIonViewDidEnter, 
  IonList, 
  IonItem, 
  IonLabel, 
  useIonToast, 
  IonText,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { editRepository } from '../services/GithubService';

const EditRepo: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const location = useLocation<{ repoToEdit: RepositoryItem }>();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState<string | null>(null);

  useIonViewDidEnter(() => {
    if (location.state?.repoToEdit) {
      const repo = location.state.repoToEdit;
      setName(repo.name);
      setDescription(repo.description || '');
      setOwner(repo.owner);
    } else {
      // Si por alguna razón no hay datos, volvemos a la lista
      history.replace('/repositorio');
    }
  });

  const handleSave = async () => {
    if (!owner) return;

    try {
      await editRepository(owner, name, { name, description });
      present({
        message: 'Repositorio actualizado correctamente.',
        duration: 2000,
        color: 'success'
      });

      // Disparamos un evento para que la lista sepa que debe recargarse
      window.dispatchEvent(new CustomEvent('repo-updated'));
      
      // Quitamos el foco y volvemos atrás
      (document.activeElement as HTMLElement)?.blur();
      history.goBack(); 
      
    } catch (error) {
      console.error(error);
      present({
        message: 'Hubo un error al actualizar el repositorio.',
        duration: 3000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/repositorio" />
          </IonButtons>
          <IonTitle>Editar Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText color="medium">
            <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Nota: solo puedes editar la descripción.
            </p>
        </IonText>
        <IonList>
            <IonItem>
              <IonLabel position="floating">Nombre (No editable)</IonLabel>
              <IonInput
                value={name}
                readonly
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Descripción</IonLabel>
              <IonTextarea
                value={description}
                onIonInput={e => setDescription(e.detail.value || '')}
                rows={6}
              />
            </IonItem>
        </IonList>

        <IonButton expand="block" onClick={handleSave} style={{ marginTop: '1rem' }}>
          Actualizar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditRepo;
