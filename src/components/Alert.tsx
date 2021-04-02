import React from 'react';
import { IconType } from 'react-icons';
import { VscCheck, VscError, VscWarning } from 'react-icons/vsc';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAlertStore } from '../stores';
import { AlertCard } from './AlertCard';

export const Alert = () => {
  const { alerts } = useAlertStore();

  return (
    <TransitionGroup className="fixed z-50 w-11/12 max-w-md space-y-5 bottom-5">
      {alerts.map((alert) => {
        let icon: IconType;
        let bgColor: string;

        switch (alert.type) {
          case 'error':
            icon = VscError;
            bgColor = 'bg-red-300';
            break;
          case 'success':
            icon = VscCheck;
            bgColor = 'bg-green-300';
            break;
          case 'warning':
            icon = VscWarning;
            bgColor = 'bg-yellow-300';
        }

        return (
          <CSSTransition
            timeout={500}
            key={alert.id}
            classNames="alert-item"
            unmountOnExit
          >
            <AlertCard alert={alert} bgColor={bgColor} icon={icon} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
