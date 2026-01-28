import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea, IonList, IonItem, IonLabel, useIonToast } from '@ionic/react';
import './Tab2.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { useState } from 'react';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {

  const [present] = useIonToast();
  const [loading, setLoading] = useState(false);
  const [repoFormData, setRepoFormData] = useState<RepositoryItem>({
    name: '',
    description: '',
    imageurl: null,
    owner: null,
    language: null,
  });

  const setRepoName = (value: string | null) => {
    setRepoFormData((prev) => ({ ...prev, name: value ?? '' }));
  };

  const setRepoDescription = (value: string | null) => {
    setRepoFormData((prev) => ({ ...prev, description: value ?? '' }));
  };

  const saveRepository = async () => {
    if (repoFormData.name.trim() === '') {
      present({
        message: 'El nombre del repositorio es obligatorio.',
        duration: 2000,
        color: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await createRepository(repoFormData);
        present({
          message: 'Repositorio creado correctamente.',
          duration: 2000,
          color: 'success'
        });
        // Limpiamos el formulario después de crear, sin navegar
        setRepoFormData({
          name: '',
          description: '',
          imageurl: null,
          owner: null,
          language: null,
        });
    } catch (error) {
        console.error(error);
        present({
          message: 'Hubo un error al guardar el repositorio. Por favor, inténtalo de nuevo.',
          duration: 3000,
          color: 'danger'
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            <IonItem>
              <IonLabel position="floating">Nombre del repositorio</IonLabel>
              <IonInput
                placeholder="android-project"
                value={repoFormData.name}
                onIonInput={(e) => setRepoName(e.detail.value as string | null)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Descripción del Repositorio</IonLabel>
              <IonTextarea
                placeholder="Este es un Repositorio de Android"
                rows={6}
                value={repoFormData.description ?? ''}
                onIonInput={(e) => setRepoDescription(e.detail.value as string | null)}
              />
            </IonItem>
        </IonList>

        <IonButton expand="block" onClick={saveRepository} style={{ marginTop: '1rem' }} disabled={loading}>
          Guardar
        </IonButton>

        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;