import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import gamesList from '../data/gamesList.json'
import '../App.css';

const GameDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const game = gamesList.find(item => item.id === parseInt(id ?? '0'))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Autres jeux</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding-start ion-padding-end">
          <h3>{game?.title}</h3>
          <div className="text-dimgray" dangerouslySetInnerHTML={{
              __html: game ? game?.description : ''
            }}>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameDetails;
