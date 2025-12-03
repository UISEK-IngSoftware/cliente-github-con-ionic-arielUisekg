import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonTextarea, IonButton, IonToast } from '@ionic/react';
import './Tab2.css';
// ...existing code...

const Tab2: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  function handleCreate() {
    if (!name.trim()) {
      setToastMsg('El nombre del repositorio es obligatorio');
      setShowToast(true);
      return;
    }

    // Simulación de creación
    setToastMsg(`Creando repo: "${name.trim()}"`);
    setShowToast(true);

    // limpiar formulario (opcional)
    setName('');
    setDescription('');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            className="form-field"
            value={name}
            onIonChange={(e) => setName(String(e.detail?.value ?? ''))}
          />
          <IonTextarea
            label="Descripción del Repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Este es un Repositorio de Android"
            className="form-field"
            rows={6}
            value={description}
            onIonChange={(e) => setDescription(String(e.detail?.value ?? ''))}
          />
          <div style={{ padding: 12 }}>
            <IonButton expand="block" onClick={handleCreate}>
              Crear
            </IonButton>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;