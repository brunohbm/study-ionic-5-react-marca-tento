import { 
  IonRow,
  IonCol,
  IonPage, 
  IonList,
  IonButton,
  IonContent, 
} from '@ionic/react';
import React from 'react';

interface historicItem {
  color: string;
  text: string;
}

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
        <IonRow>
          <IonCol size="4">
            <IonButton expand="block" color="light">
              <span className="button-text">
                -1
              </span>
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="block" color="light">
              <span className="button-text">
                +1
              </span>
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton expand="block" color="light">
              <span className="button-text">
                +3
              </span>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  </IonCol>  
)

const Historic: React.FunctionComponent<{
  items: Array<historicItem>;
}> = props => (
    <IonCol className="historic-wrapper"> 
      <IonRow className="header">
        <IonCol className="historic-title">
        Historic
        </IonCol>
      </IonRow>
      <IonRow className="body">
      {props.items.length ? (
        <IonCol>
          <IonList>
            {
              props.items.map((item: historicItem) => (
                <div className={`${item.color}-item`}>
                  {item.text}
                </div>
              ))
            }
          </IonList>
        </IonCol>
        ) : null
      }
      </IonRow>
    </IonCol>
  );

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
          <Historic items={[
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'blue',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'blue',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
            {
              text: 'Player number 1 win +3 points',
              color: 'red',
            },
          ]} />
        </IonRow>
        <IonRow className="bottom-buttons">
          <IonCol>
          <IonButton color="danger" expand="block">
              <span className="white-text-button">
                Desfazer ação
              </span>
            </IonButton>
          </IonCol>
          <IonCol>
          <IonButton expand="block">
            <span className="white-text-button">
              Novo jogo
            </span>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
