import { IonButton, IonIcon } from '@ionic/react'
import { alertCircleSharp } from 'ionicons/icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../../queries/useCategories';
import styles from "./Home.module.css";

export const NetworkError: React.FC = () => {
  const { error, refetch } = useCategories();
  const { t } = useTranslation();
  return (
    <div style={{ padding: '0 1em', textAlign: 'center' }}>
      <h3 className={styles.titleStyle}>
        {error?.message}
      </h3>
      <IonIcon
        style={{ fontSize: '32px', color: 'coral' }}
        icon={alertCircleSharp}
        slot="start"
      />
      <p>{t('connectionError')}</p>
      <IonButton onClick={() => refetch()}>Rafraichir</IonButton>
    </div>
  )
}
