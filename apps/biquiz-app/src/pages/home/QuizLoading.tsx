import React from 'react'
import {
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonLabel,
  IonProgressBar,
} from "@ionic/react";
import styles from "./Home.module.css";
import { useTranslation } from 'react-i18next';

const QuizLoading: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
    <h3 className={styles.titleStyle}>
      {t('loading')}
    </h3>
    <IonProgressBar type="indeterminate"></IonProgressBar>
    <IonList>
      {[...(new Array(4))].map((item, index) => <IonItem key={index}>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: '50%' }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: '80%' }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: '60%' }} />
            </p>
          </IonLabel>
        </IonItem>)}
    </IonList>
    </>
  )
}

export default QuizLoading