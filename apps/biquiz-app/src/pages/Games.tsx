import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import gamesList from '../data/gamesList.json'
import '../App.css';

const Games: React.FC = () => {

  const history = useHistory()

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
      <IonItemDivider>
        <p>Collections de petits jeux bibliques</p>
      </IonItemDivider>
      <IonList>
        {gamesList.map((game, idx) => (
          <IonItem key={idx} onClick={() => history.push("/page/game/"+game.id)}>
            <IonLabel>
              <h3>{game.title}</h3>
              <div className="text-dimgray">
                {game.description.replace(/<[^>]*>?/gm, '').slice(0,35)+'...'}
              </div>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Games;
