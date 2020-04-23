import { 
  IonRow,
  IonCol,
  IonPage, 
  IonList,
  IonInput,
  IonButton,
  IonContent, 
  IonActionSheet,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface historicItem {
  player: string;
  color: string;
  text: string;  
}

const saveLanguageOnStorage = (language: string) => {
  localStorage.setItem('lenguage', language);
}

const portugueseTexts = {
  wins: 'Vitórias',
  match: 'Partida',
  player: 'Jogador',
  history: 'Histórico',
  options: 'Opções',
  welcome: 'Bem vindo',
  less1: 'perdeu 1 ponto',  
  more1: 'ganhou 1 ponto',
  more3: 'ganhou 3 pontos',
  restartGame: 'Zerar partidas',
  winsMatch: 'ganhou uma partida',
  lostMatch: 'perdeu uma partida',
  undoAction: 'Desfazer ação',
  changeLanguage: 'Mudar idioma para inglês',  
};

const englishTexts = {
  wins: 'Wins',
  match: 'Match',
  player: "Player",
  history: 'History',
  options: 'Options',
  restartGame: 'Restart matchs',
  welcome: 'Welcome',
  less1: 'lost 1 point',  
  more1: 'wins 1 point',
  more3: 'wins 3 points',
  winsMatch: 'wins a mach',
  lostMatch: 'lost a mach',
  undoAction: 'Undo last action',
  changeLanguage: 'Change language to portuguese'
};

let pointsHistory = [{
  blue: {
    points: 0,
    wins: 0,
  },
  red: {
    points: 0,
    wins: 0,
  }
}];

const ScoreBoard: React.StatelessComponent<{
  value: string;
  points: number;
  onBlur: Function;
  victoryText: string;
  placeholder: string;
  victoriesAmount: number;
  onChangePoint: Function;
  onChangeValue: Function;
}> = props => (
  <IonCol>
    <IonRow>
      <IonCol className="score-name">
        <IonInput 
          placeholder={props.placeholder} 
          value={props.value}
          maxlength={25}
          onIonBlur={() => { props.onBlur(); }}
          onIonChange={e => { props.onChangeValue(e.detail.value); }}
        />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="main-score">
        {props.points}
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="victories">
        {props.victoryText}
        {': '}
        {props.victoriesAmount}
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol className="buttons">
        <IonRow>
          <IonCol size="4">
            <IonButton onClick={() => { props.onChangePoint(1, 'less'); }} expand="block" color="light">
              <span className="button-text">
                -1
              </span>
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton onClick={() => { props.onChangePoint(1, 'more'); }} expand="block" color="light">
              <span className="button-text">
                +1
              </span>
            </IonButton>
          </IonCol>
          <IonCol size="4">
            <IonButton onClick={() => { props.onChangePoint(3, 'more'); }} expand="block" color="light">
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
  title: string;
}> = props => (
    <IonCol className="historic-wrapper"> 
      <IonRow className="header">
        <IonCol className="historic-title">
        {props.title}
        </IonCol>
      </IonRow>
      <IonRow className="body">
      {props.items.length ? (
        <IonCol>
          <IonList>
            {
              props.items.map((item: historicItem) => (
                <div key={Math.random()} className={`${item.color}-item`}>
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
  const [match, setMatch] = useState(1);
  const [texts, setTexts] = useState(portugueseTexts);
  const [names, setNames] = useState({ blue: 'player', red: 'player' });
  const [playesData, setPlayersData] = useState({
    blue: {
      points: 0,
      wins: 0,
    },
    red: {
      points: 0,
      wins: 0,
    }
  });
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [history, setHistory] = useState([{ text: 'welcome', color: 'red', player: '' }]);
  const [lenguageActive, setLenguageActive] = useState(localStorage.getItem('lenguage') || navigator.language);

  const formatValue = (value: string) => value
        .substring(0,1).toUpperCase().concat(value.substring(1)).replace('  ', ' ');
  
  useEffect(() => {
    saveLanguageOnStorage(lenguageActive);
    if(lenguageActive === 'pt-BR') {
      setTexts(portugueseTexts);
    } else {
      setTexts(englishTexts);
    }
  }, [lenguageActive])

  const executeAction = (value: number, action: string, team: string) => {
    const pl: any = {
      blue: {
        points: playesData.blue.points,
        wins: playesData.blue.wins,
      },
      red: {
        points: playesData.red.points,
        wins: playesData.red.wins,
      }
    }
    const newHistory = [
      { text: `${action}${value || ''}`, color: team, player: team },
      ...history,
    ];

    if(action === 'more' && (pl[team].points + value) > 11) {
      executeAction(0, 'winsMatch', team);
      return;
    }

    if(action === 'less' && pl[team].points > 0) {
        pl[team].points -= value;
        pointsHistory.push(pl);
        setHistory(newHistory);
        setPlayersData(pl);
    }
    if(action === 'more' && pl[team].points < 11) {
      pl[team].points += value;
      pointsHistory.push(pl);
      setHistory(newHistory);
      setPlayersData(pl);
    }
    if(action === 'winsMatch') {
      pl.blue.points = 0;
      pl.red.points = 0;
      pl[team].wins += 1;
      pointsHistory.push(pl);
      setMatch(match + 1);
      setHistory(newHistory);
      setPlayersData(pl);
    }
  }

  const changeLanguage = () => {
    if(lenguageActive === 'pt-BR') {
      setLenguageActive('en-US');
      return;
    }
    setLenguageActive('pt-BR'); 
  }

  const restartGame = () => {
    setMatch(1);
    setPlayersData({
      blue: {
        points: 0,
        wins: 0,
      },
      red: {
        points: 0,
        wins: 0,
      }
    });
    pointsHistory = [{
      blue: {
        points: 0,
        wins: 0,
      },
      red: {
        points: 0,
        wins: 0,
      }
    }];    
    setHistory([{ text: 'welcome', color: 'red', player: '' }]);
  }

  const undoAction = () => {
    if(pointsHistory.length === 1) return;   
    if(history[0].text === 'winsMatch') {
      setMatch(match - 1);
    }
    setPlayersData(pointsHistory[pointsHistory.length - 2]);
    setHistory(history.slice(1, history.length));
    pointsHistory = pointsHistory.slice(0, pointsHistory.length - 1);
  }

  return (
    <IonPage>      
      <IonContent>
        <IonRow className="title">
          <IonCol>
            {texts.match}
            {': '}
            {match}
          </IonCol>
        </IonRow>
        <IonRow className="scoreboards">
          <IonCol size="6">
            <IonRow className="blue-wrapper">
                <ScoreBoard 
                  victoryText={texts.wins}                  
                  points={playesData.blue.points}
                  placeholder={`${texts.player} 1` }
                  victoriesAmount={playesData.blue.wins}
                  value={names.blue === 'player' ? '' : names.blue}
                  onBlur={() => { setNames({ blue: names.blue.trim() || 'player', red: names.red }); } }
                  onChangePoint={(amount: number, action: string) => { executeAction(amount, action, 'blue'); }}
                  onChangeValue={(newName: string) => {  setNames({ blue: formatValue(newName) || 'player', red: names.red }); }}
                />
            </IonRow>
          </IonCol>
          <IonCol size="6">
              <IonRow className="red-wrapper">
                <ScoreBoard 
                  victoryText={texts.wins}
                  points={playesData.red.points}
                  placeholder={`${texts.player} 2`}
                  victoriesAmount={playesData.red.wins}
                  value={names.red === 'player' ? '' : names.red}
                  onBlur={() => { setNames({ red: names.red.trim() || 'player', blue: names.blue }); } }
                  onChangePoint={(amount: number, action: string) => { executeAction(amount, action, 'red'); }}
                  onChangeValue={(newName: string) => {  setNames({ blue: names.blue, red: formatValue(newName) || 'player' }); }}
                />
              </IonRow>
          </IonCol>
        </IonRow>
        <IonRow>
          <Historic 
            title={texts.history}
            items={history.map((item: historicItem) => {
              const txt: any = texts;
              const nm: any = names;
              let text = (nm[item.player] || '');
              if (txt[nm[item.player]]) {
                text = `${txt[nm[item.player]]} ${item.color === 'blue' ? 1 : 2}`
              }
              return ({ ...item, text: `${text} ${txt[item.text]}` });
            })} 
          />
        </IonRow>
        <IonRow className="bottom-buttons">
          <IonCol>
          <IonButton 
            color="danger"
            expand="block"
            onClick={() => setShowActionSheet(true)}
          >
              <span className="white-text-button">
                {texts.options}
              </span>
            </IonButton>
            <IonActionSheet
              isOpen={showActionSheet}
              onDidDismiss={() => setShowActionSheet(false)}
              buttons={[{
                text: texts.restartGame,
                role: 'destructive',
                handler: restartGame,
              }, {
                text: texts.changeLanguage,
                handler: changeLanguage,
              }
            ]}
            />
          </IonCol>
          <IonCol>
          <IonButton 
            onClick={undoAction}
            expand="block"
          >
            <span className="white-text-button">
              {texts.undoAction}
            </span>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
