import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonAlert, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository } from '../services/GithubService';
import { useHistory } from 'react-router';
import { add } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const[repos,SetRepos]=React.useState<RepositoryItem[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<RepositoryItem | null>(null);
  const history = useHistory();

  const loadRepos= async()=>{
    const reposData= await fetchRepositories();
    SetRepos(reposData);
  };

  useIonViewDidEnter(()=>{
    console.log("IownViewDidEnter - Cargando Repositorios")
    loadRepos();
  });

  useEffect(() => {
    const handleRepoUpdate = () => {
      console.log("Evento 'repo-updated' recibido, recargando repositorios.");
      loadRepos();
    };

    window.addEventListener('repo-updated', handleRepoUpdate);
    return () => window.removeEventListener('repo-updated', handleRepoUpdate);
  }, []); // El array vacío asegura que esto se ejecute solo una vez (al montar/desmontar)

  const handleEdit = (repo: RepositoryItem) => {
    // Quitar el foco del botón presionado antes de navegar para evitar el warning de aria-hidden
    (document.activeElement as HTMLElement)?.blur();
    history.push({
      pathname: '/edit-repo',
      state: { repoToEdit: repo }
    });
  };

  const handleCreate = () => {
    (document.activeElement as HTMLElement)?.blur();
    history.push('/crear-repo');
  };

  const handleDelete = async () => {
    if (repoToDelete && repoToDelete.owner) {
      await deleteRepository(repoToDelete.owner, repoToDelete.name);
      SetRepos(repos.filter(r => r.id !== repoToDelete.id));
    }
    setShowAlert(false);
    setRepoToDelete(null);
  };

  const confirmDelete = (repo: RepositoryItem) => {
    setRepoToDelete(repo);
    setShowAlert(true);
  };

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
        {repos.map((repo)=>
          <RepoItem
          key={repo.id}
          repo={repo}
          onEdit={handleEdit}
          onDelete={confirmDelete}
          />)}

        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleCreate}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirmar Eliminación'}
          message={`¿Estás seguro de que quieres eliminar el repositorio <strong>${repoToDelete?.name}</strong>?`}
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setRepoToDelete(null) },
            { text: 'Eliminar', handler: handleDelete }
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
