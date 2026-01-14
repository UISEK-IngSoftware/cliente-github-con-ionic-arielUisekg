import { IonItem, IonLabel, IonThumbnail, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { pencil, trash } from 'ionicons/icons';

interface RepoItemProps {
  repo: RepositoryItem;
  onEdit: (repo: RepositoryItem) => void;
  onDelete: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
          <IonThumbnail slot="start">
              <img src={repo.imageurl|| "https://i.pinimg.com/736x/06/44/69/0644695c31b934311a6a80e1064485bf.jpg"} alt={repo.name}/>
          </IonThumbnail>
          <IonLabel>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p>Propietario: {repo.owner}</p>
            <p>Lenguaje: {repo.language || 'No especificado'}</p>
            </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption onClick={() => onEdit(repo)}>
          <IonIcon slot="icon-only" icon={pencil}></IonIcon>
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => onDelete(repo)}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
