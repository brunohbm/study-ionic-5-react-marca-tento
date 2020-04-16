import { 
  IonPage, 
  IonContent, 
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React from 'react';
import './Home.css';

const ScoreBoard: React.FC = () => (
  <IonCol>
    <IonRow>
      <IonCol className="score-name">
        Player 1
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="main-score">
        10
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="victories">
        Vitórias: 10
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="buttons">
        -1 +1 +3
      </IonCol>
    </IonRow>
  </IonCol>  
)

const Home: React.FC = () => {
  return (
    <IonPage>      
      <IonContent>
        <IonRow className="title">
          <IonCol>Partida 1</IonCol>
        </IonRow>
        <IonRow className="scoreboards">
          <IonCol size="6">
            <IonRow className="blue-wrapper">
                <ScoreBoard />
            </IonRow>
          </IonCol>
          <IonCol size="6">
              <IonRow className="red-wrapper">
                <ScoreBoard />
              </IonRow>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>ion-col</IonCol>
        </IonRow>
        <IonRow>
          <IonCol>ion-col</IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
