import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel,
  IonToggle,
  IonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useSettingsStore } from "../stores/useSettingsStore";
import { useScoresStore } from "../stores/useScoresStore";
import "./Settings.css";

const Settings: React.FC = () => {
  const language = useSettingsStore((s) => s.language);
  const isDarkMode = useSettingsStore((s) => s.isDarkMode);
  const displaySource = useSettingsStore((s) => s.displaySource);
  const setIsDarkMode = useSettingsStore((s) => s.setIsDarkMode);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const setDisplaySource = useSettingsStore((s) => s.setDisplaySource);
  const resetProgress = useScoresStore((s) => s.resetProgress);
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{t('settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Choisir une langue"}
            buttons={[
              {
                text: t('french'),
                cssClass: "secondary",
                handler: () => {
                  i18n.changeLanguage('fr');
                  setLanguage('fr');
                  queryClient.invalidateQueries({ queryKey: ['categories'] });
                },
              },
              {
                text: t('english'),
                handler: () => {
                  i18n.changeLanguage('en');
                  setLanguage('en');
                  queryClient.invalidateQueries({ queryKey: ['categories'] });
                },
              },
            ]}
          />
          <IonAlert
            isOpen={showResetAlert}
            onDidDismiss={() => setShowResetAlert(false)}
            header={"Reset your progress"}
            subHeader={"Do you really want to reset your progress?"}
            buttons={[
              {
                text: t('yes'),
                cssClass: "secondary",
                handler: () => {
                  resetProgress();
                },
              },
              {
                text: t('no'),
              },
            ]}
          />
          <IonItem>
            <IonLabel onClick={() => setShowAlert(true)}>
              <h2>{t('langOption')}</h2>
              <p>{language === 'fr' ? t('french') : t('english')}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => setShowResetAlert(true)}>
              Reset your progress
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{t('darkMode')}</IonLabel>
            <IonToggle
              slot="end"
              id="themeToggle"
              checked={isDarkMode}
              onIonChange={(e) => setIsDarkMode(e.detail.checked)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>{t('displaySourceInQuiz')}</IonLabel>
            <IonToggle
              slot="end"
              checked={displaySource}
              onIonChange={(e) => setDisplaySource(e.detail.checked)}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
